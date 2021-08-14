import { ref } from 'vue';

// Used to display a message to the user
export const theAlert = ref({
  message: '',
  type: 'alert',
});

/**
 * Set Alert
 *
 * Sets an alert message to be displayed to the user.
 *
 * @param {string} message
 */
export const setAlert = (message) => {
  theAlert.value = {
    message,
    type: 'alert',
  };
};

/**
 * Set Error
 *
 * Sets an error message to be displayed to the user.
 *
 * @param {string} message
 */
export const setError = (message) => {
  theAlert.value = {
    message,
    type: 'error',
  };
};

/**
 * Handle Error
 *
 * Alerts the user to an error state, and console logs the error.
 *
 * @param {Error} error
 */
export const handleError = (error) => {
  setError('Error: ' + error.message);
  console.error(error);
};

/**
 * Clear Alert
 *
 * Removes the existing alert.
 */
export const clearAlert = () => {
  setAlert('');
};
