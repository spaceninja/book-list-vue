import { supabase } from '../lib/supabase';
import { ref } from 'vue';
import { userSession } from './useAuth';
import { clearAlert, handleError } from './useAlert';

export const allTodos = ref([]);

/**
 * Fetch Todos
 *
 * Retreive all todo for the signed in user
 */
export const fetchTodos = async () => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id');
    if (error) throw error;
    // save the todos from supabase (or an empty array) to app state
    allTodos.value = data === null ? [] : data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Add Todo
 *
 *  Add a new todo to supabase
 *
 * @param {string} task
 */
export const addTodo = async (task) => {
  clearAlert();
  try {
    // Check to ensure user is still logged in.
    if (userSession?.value === null) throw new Error('Please log in again');
    // Guard for short task descriptions which will fail database policy.
    if (task.length <= 3)
      throw new Error('Please make your task a little more descriptive');
    const { data, error } = await supabase
      .from('todos')
      .insert({
        user_id: userSession.value.user.id,
        task: task,
      })
      .single();
    if (error) throw error;
    // it's been added to supabase, now add to app state
    allTodos.value.push(data);
    return data;
  } catch (error) {
    handleError(error);
    return false;
  }
};

/**
 * Update Todo Completion
 *
 * Targets a specific todo via its record id and updates the is_completed attribute.
 *
 * @param {Object} todo
 * @param {boolean} isCompleted
 */
export const updateTodoCompletion = async (todo, isCompleted) => {
  clearAlert();
  try {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: isCompleted })
      .eq('id', todo.id)
      .single();
    if (error) throw error;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Delete Todo
 *
 * Deletes a todo via its id
 *
 * @param {Object} deletedTodo
 */
export const deleteTodo = async (deletedTodo) => {
  clearAlert();
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', deletedTodo.id);
    if (error) throw error;
    // it's been deleted from supabase, now delete from app state
    allTodos.value = allTodos.value.filter((todo) => todo.id != deletedTodo.id);
  } catch (error) {
    handleError(error);
  }
};
