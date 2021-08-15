import { supabase } from '../lib/supabase';
import { ref, computed } from 'vue';
import { userSession } from './useAuth';
import { clearAlert, handleError } from './useAlert';

export const emptyBook = {
  isbn: '',
  title: '',
};

export const allBooks = ref([]);
export const currentBook = ref(emptyBook);
export const allBooksIsEmpty = computed(() => allBooks.value.length === 0);
export const isLoading = ref(true);
export const editMode = ref(null);

/**
 * Is ISBN Already Used?
 *
 * Checks if the given ISBN is already in the allBooks list.
 *
 * @param {string} isbn
 * @returns boolean
 */
export const isIsbnAlreadyUsed = (isbn) => {
  return allBooks.value.some((book) => book.isbn === isbn);
};

/**
 * ISBN Already Used
 *
 * Computed property checking that we're in Add mode and this ISBN has been used.
 */
export const isbnAlreadyUsed = computed(() => {
  if (editMode.value === 'add') {
    return isIsbnAlreadyUsed(currentBook.value.isbn);
  }
  return false;
});

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
    // save the todos from supabase (or an empty array) to app state
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
    if (isIsbnAlreadyUsed(book.isbn))
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
