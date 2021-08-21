import { supabase } from '../lib/supabase';
import { ref, computed } from 'vue';
import { firstBy } from 'thenby';
import { emptyBook } from '../utils/empty-book';
import { sortOptions } from '../utils/sort-options';
import { userSession } from './useAuth';
import { clearAlert, handleError } from './useAlert';
const googleBooksApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

/**
 * REACTIVE REFERENCES ---------------------------------------------------------
 */

export const allBooks = ref([]);
export const currentBook = ref(emptyBook);
export const isLoading = ref(true);
export const editMode = ref(null);
export const sortBy = ref({
  firstBy: 'rating',
  firstByOrder: 'descending',
  thenBy: 'length',
  thenByOrder: 'ascending',
});
export const filterBy = ref([]);

/**
 * COMPUTED PROPERTIES ---------------------------------------------------------
 */

/**
 * Sorted and Filtered Books
 *
 * Computed property to sort and filter the `allBooks` set.
 *
 * @returns Array
 */
export const sortedAndFilteredBooks = computed(() => {
  return getSortedAndFilteredBooks(
    allBooks.value,
    filterBy.value,
    sortBy.value
  );
});

/**
 * ISBN Already Used
 *
 * Computed property checking that we're in Add mode and this ISBN has been used.
 *
 * @returns boolean
 */
export const isIsbnUsed = computed(() => {
  return editMode.value === 'add'
    ? checkIfIsbnIsUsed(currentBook.value.isbn)
    : false;
});

/**
 * INTERNAL HELPER METHODS -----------------------------------------------------
 * These functions don't need to be exported, they only used in this file.
 */

/**
 * Is ISBN Already Used?
 *
 * Checks if the given ISBN is already in the allBooks list.
 *
 * @param {string} isbn
 * @returns boolean
 */
const checkIfIsbnIsUsed = (isbn) => {
  return allBooks.value.some((book) => book.isbn === isbn);
};

/**
 * Get Sorted and Filtered Books
 *
 * Given an array of books, a set of filters, and a sort method,
 * returns a filtered and sorted set of books.
 *
 * @param {Array} bookSet
 * @param {Array} filterBy
 * @param {Object} sortBy
 * @returns Array
 */
const getSortedAndFilteredBooks = (bookSet, filterBy, sortBy) => {
  // filter the book set
  filterBy.forEach((key) => {
    bookSet = bookSet.filter((book) => book[key]);
  });
  // sort the filtered book set
  return bookSet.sort(
    firstBy(sortBy.firstBy, {
      ignoreCase: true,
      direction: sortBy.firstByOrder === 'descending' ? -1 : 0,
    }).thenBy(sortBy.thenBy, {
      ignoreCase: true,
      direction: sortBy.thenByOrder === 'descending' ? -1 : 0,
    })
  );
};

/**
 * FILTER & SORT METHODS -------------------------------------------------------
 * These functions help define how to filter and sort the book set.
 */

/**
 * Set Filter
 *
 * Updates the `filterBy` array, adding or removing the given filter.
 *
 * @param {Event} event
 */
export const setFilter = (event) => {
  if (event.target.checked) {
    filterBy.value.push(event.target.name);
  } else {
    filterBy.value = filterBy.value.filter(
      (item) => item !== event.target.name
    );
  }
};

/**
 * Set Sorting Method
 *
 * Updates the `sortBy` object with the given sort method.
 *
 * @param {Event} event
 */
export const setSort = (event) => {
  sortBy.value = { ...sortOptions[event.target.value] };
};

/**
 * EDIT MODE METHODS -----------------------------------------------------------
 * These functions control whether the app should show the Edit Book form.
 */

/**
 * Enter "Add Book" Mode
 *
 * Passes an empty book to the Edit Book form and shows it.
 */
export const enterAddBookMode = () => {
  currentBook.value = { ...emptyBook };
  editMode.value = 'add';
};

/**
 * Enter "Edit Book" Mode
 *
 * Passes the given book to the Edit Book form and shows it.
 *
 * @param {Object} book
 */
export const enterEditBookMode = (book) => {
  currentBook.value = { ...book };
  editMode.value = 'edit';
};

/**
 * Exit Edit Mode
 *
 * Resets the Edit Book form and hides it.
 */
export const exitEditMode = () => {
  currentBook.value = { ...emptyBook };
  editMode.value = null;
};

/**
 * API METHODS -----------------------------------------------------------------
 * These functions talk to the third-party APIs like Supabase.
 */

export const getCover = (isbn) => {
  fetch(
    'https://www.googleapis.com/books/v1/volumes?q=isbn:' +
      isbn +
      '&fields=items(volumeInfo(imageLinks))' +
      '&key=' +
      googleBooksApiKey,
    { method: 'get' }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) throw new Error(data.error.message);
      console.log('Fetched Thumbnails', data);
      let img = data.items[0].volumeInfo.imageLinks.thumbnail;
      img = img.replace(/^http:\/\//i, 'https://');
      img = img.replace(/&edge=curl/i, '');
      currentBook.value.thumbnail = img;
    })
    .catch((error) => {
      handleError(error);
    });
};

/**
 * Fetch Books
 *
 * Retreive all books for the signed in user
 */
export const fetchBooks = async () => {
  try {
    isLoading.value = true;
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('id');
    if (error) throw error;
    // save the books from supabase (or an empty array) to app state
    allBooks.value = data === null ? [] : data;
    console.log('Fetched Books', allBooks.value);
  } catch (error) {
    handleError(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Add Book
 *
 *  Add a new book to supabase
 *
 * @param {Object} book
 */
export const addBook = async (book) => {
  console.log('ADD BOOK', book);
  clearAlert();
  try {
    // Check to ensure user is still logged in.
    if (userSession?.value === null) throw new Error('Please log in again');
    // Don't allow adding books without an ISBN or title
    if (!(book.isbn && book.title))
      throw new Error('Books must have an ISBN and title.');
    // Check that this ISBN hasn't already been added
    if (checkIfIsbnIsUsed(book.isbn))
      throw new Error('That ISBN has already been added!');
    // add user ID
    book['user_id'] = userSession.value.user.id;
    // save to supabase
    const { data, error } = await supabase.from('books').insert(book).single();
    if (error) throw error;
    // it's been added to supabase, now add to app state and exit edit mode
    allBooks.value.push(data);
    exitEditMode();
  } catch (error) {
    handleError(error);
  }
};

/**
 * Edit Book
 *
 * Targets a specific book via its record id and updates it.
 *
 * @param {Object} book
 */
export const editBook = async (book) => {
  console.log('EDIT BOOK', book);
  clearAlert();
  try {
    // Check to ensure user is still logged in.
    if (userSession?.value === null) throw new Error('Please log in again');
    // Don't allow adding books without an ISBN or title
    if (!(book.isbn && book.title))
      throw new Error('Books must have an ISBN and title.');
    // TODO: check if ISBN has already been used by a book that doesn't match this ID
    // add updated date
    book['updated_at'] = new Date();
    // save to supabase
    const { data, error } = await supabase
      .from('books')
      .update(book)
      .eq('id', book.id)
      .single();
    if (error) throw error;
    // it's been saved to supabase, now save to app state and exit edit mode
    const bookIndex = allBooks.value.findIndex((book) => book.id === data.id);
    allBooks.value[bookIndex] = data;
    exitEditMode();
  } catch (error) {
    handleError(error);
  }
};

/**
 * Delete Book
 *
 * Deletes a book via its id
 *
 * @param {Object} deletedBook
 */
export const deleteBook = async (deletedBook) => {
  clearAlert();
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', deletedBook.id);
    if (error) throw error;
    // it's been deleted from supabase, now delete from app state
    allBooks.value = allBooks.value.filter((book) => book.id != deletedBook.id);
  } catch (error) {
    handleError(error);
  }
};
