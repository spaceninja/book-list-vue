import { ref, computed } from 'vue';
import { firebaseApp } from '../lib/firebase';
import {
  getDatabase,
  ref as dbRef,
  push,
  set,
  onValue,
} from 'firebase/database';
import { firstBy } from 'thenby';
import { emptyBook } from '../utils/empty-book';
import { sortOptions } from '../utils/sort-options';
import { userSession } from './useAuth';
import { clearAlert, handleError } from './useAlert';

// Get a reference to the database service
const database = getDatabase(firebaseApp);
const googleBooksApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

/**
 * REACTIVE REFERENCES ---------------------------------------------------------
 */

export const allBooks = ref([]);
export const currentBook = ref(emptyBook);
export const isLoading = ref(true);
export const editMode = ref(null);
export const sortBy = ref({ ...sortOptions.rating });
export const filterBy = ref([]);
export const unloadDbListener = ref(() => {});

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
 * These functions don't need to be exported, they're only used in this file.
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
 * These functions talk to the third-party APIs like Firebase & Google Books.
 */

/**
 * Get Book Cover
 *
 * Given an ISBN, requests book cover thumbnail images from Google Books API.
 *
 * @param {string} isbn
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
 * Retreive all books for the signed in user and watch for changes
 *
 * @see https://firebase.google.com/docs/reference/js/database#onvalue
 */
export const loadUserBooks = async (uid) => {
  console.log('FETCH BOOKS', uid);
  try {
    isLoading.value = true;
    // create a database reference
    const booksRef = dbRef(database, 'books/' + uid);
    // add a listener for database changes
    unloadDbListener.value = onValue(booksRef, (snapshot) => {
      let data = snapshot.val();
      // coerce to an array for easier local filtering & sorting
      // @see https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html
      if (data === null) data = [];
      data = data.isArray ? data : Object.values(data);
      // save the books from database (or an empty array) to app state
      allBooks.value = data;
      console.log('BOOKS REF CHANGE', allBooks.value);
    });
  } catch (error) {
    handleError(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Unload Books
 *
 * Remove all books from state and remove listener
 *
 * @see https://firebase.google.com/docs/reference/js/database#onvalue
 */
export const unloadUserBooks = async () => {
  console.log('UNLOAD BOOKS');
  // remove listener
  unloadDbListener.value();
  // reset state
  allBooks.value = [];
  unloadDbListener.value = () => {};
};

/**
 * Add Book
 *
 *  Add a new book to database
 *
 * @see https://firebase.google.com/docs/reference/js/database#set
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
    // create a database reference
    const newBookRef = dbRef(
      database,
      `books/${userSession.value.uid}/${book.isbn}`
    );
    // save to database
    await set(newBookRef, book);
    exitEditMode();
  } catch (error) {
    handleError(error);
  }
};

/**
 * Edit Book
 *
 * Targets a specific book via its isbn and updates it.
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
    // create a database reference
    const newBookRef = dbRef(
      database,
      `books/${userSession.value.uid}/${book.isbn}`
    );
    // save to database
    await set(newBookRef, book);
    exitEditMode();
  } catch (error) {
    handleError(error);
  }
};

/**
 * Delete Book
 *
 * Deletes a book via its isbn
 *
 * @param {Object} deletedBook
 */
export const deleteBook = async (deletedBook) => {
  console.log('DELETE BOOK', deletedBook);
  clearAlert();
  try {
    // create a database reference
    const newBookRef = dbRef(
      database,
      `books/${userSession.value.uid}/${deletedBook.isbn}`
    );
    // save to database
    await set(newBookRef, null);
  } catch (error) {
    handleError(error);
  }
};
