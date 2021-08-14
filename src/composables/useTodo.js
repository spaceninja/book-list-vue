import { supabase } from '../lib/supabase';
import { ref } from 'vue';
import { userSession } from './useAuth';

const allTodos = ref([]);

/**
 * Retreive all todo for the signed in user
 */
async function fetchTodos() {
  try {
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('id');

    if (error) {
      console.log('error', error);
      return;
    }
    // handle for when no todos are returned
    if (todos === null) {
      allTodos.value = [];
      return;
    }
    // store response to allTodos
    allTodos.value = todos;
    console.log('got todos!', allTodos.value);
  } catch (err) {
    console.error('Error retrieving data from db', err);
  }
}

/**
 *  Add a new todo to supabase
 */
async function addTodo(todo) {
  try {
    const { data, error } = await supabase.from('todos').insert(todo).single();

    if (error) {
      alert(error.message);
      console.error('There was an error inserting', error);
      return null;
    }

    console.log('created a new todo');
    return data;
  } catch (err) {
    alert('Error');
    console.error('Unknown problem inserting to db', err);
    return null;
  }
}

/**
 * Wrapper function adding a new todo for additional client side error handling.
 */
async function insertTask(task) {
  // Guard for short task descriptions which will fail db policy.
  if (task.length <= 3) {
    alert('Please make your task a little more descriptive');
    return;
  }
  // Type check to ensure user is still logged in.
  if (userSession?.value === null) {
    alert('Please log in again');
    return;
  }
  try {
    const todo = await addTodo({
      user_id: userSession.value.user.id,
      task: task,
    });
    // If there was no response, dont do anything.
    if (!todo) {
      return;
    }
    // Otherwise push the response into allTodos.
    allTodos.value.push(todo);
  } catch (err) {
    console.error('Unknown error when adding todo', err);
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
async function updateTaskCompletion(todo, isCompleted) {
  try {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: isCompleted })
      .eq('id', todo.id)
      .single();

    if (error) {
      alert(error.message);
      console.error('There was an error updating', error);
      return;
    }

    console.log('Updated task', todo.id);
  } catch (err) {
    alert('Error');
    console.error('Unknown problem updating record', err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteTodo(deletedTodo) {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', deletedTodo.id);
    if (error) throw error;
    // it's been deleted from supabase, now delete from app state
    allTodos.value = allTodos.value.filter((todo) => todo.id != deletedTodo.id);
  } catch (error) {
    console.error('error', error);
  }
}

export {
  allTodos,
  fetchTodos,
  addTodo,
  updateTaskCompletion,
  insertTask,
  deleteTodo,
};
