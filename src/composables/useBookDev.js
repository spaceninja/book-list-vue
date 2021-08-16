import { supabase } from '../lib/supabase';
import { userSession } from './useAuth';
import { allBooks } from './useBook';
import { clearAlert, handleError } from './useAlert';
import initBooks from '../sample-data/init-books.json';
import sampleBooks from '../sample-data/sample-books.json';

/**
 * Add Books
 *
 * Imports a set of books into Supabase.
 *
 * @param {Array} books - an array of book objects
 */
const addBooks = async (books) => {
  clearAlert();
  try {
    const theBooks = books.map((book) => ({
      ...book,
      user_id: userSession.value.user.id,
    }));
    const { data, error } = await supabase.from('books').insert(theBooks);
    if (error) throw error;
    // they've been added to supabase, now add to app state
    allBooks.value = data;
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
    clearAlert();
    try {
      const allBookIds = allBooks.value.map((book) => book.id);
      const { error } = await supabase
        .from('books')
        .delete()
        .in('id', allBookIds);
      if (error) throw error;
      // all books deleted from supabase, now delete from app state
      allBooks.value = [];
    } catch (error) {
      handleError(error);
    }
  }
};
