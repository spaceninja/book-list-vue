import { firebaseApp } from '../lib/firebase';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { userSession } from './useAuth';
import { clearAlert, handleError } from './useAlert';
import initBooks from '../sample-data/init-books.json';
import sampleBooks from '../sample-data/sample-books.json';

// Get a reference to the database service
const database = getDatabase(firebaseApp);

/**
 * Add Books
 *
 * Imports a set of books into the database.
 *
 * @param {Array} books - an array of book objects
 */
const addBooks = async (books) => {
  console.log('ADD BOOKS', books);
  clearAlert();
  try {
    // create a database reference
    const booksRef = dbRef(database, `books/${userSession.value.uid}`);
    // save to database
    await set(booksRef, books);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Import the init book set
 */
export const addInitBooks = async () => {
  addBooks(initBooks);
};

/**
 * Import the sample book set
 */
export const addSampleBooks = async () => {
  addBooks(sampleBooks);
};

/**
 * Delete All Books
 */
export const deleteAllBooks = async () => {
  if (window.confirm('Woah, there hoss… Are you sure?')) {
    console.log('DELETE ALL BOOKS');
    clearAlert();
    try {
      // create a database reference
      const booksRef = dbRef(database, `books/${userSession.value.uid}`);
      // save to database
      await set(booksRef, null);
    } catch (error) {
      handleError(error);
    }
  }
};
