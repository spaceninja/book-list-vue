import { ref } from 'vue';
import { supabase } from '../lib/supabase';

// Used to display a message to the user
export const authAlert = ref({
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
const setAlert = (message) => {
  authAlert.value = {
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
const setError = (message) => {
  authAlert.value = {
    message,
    type: 'error',
  };
};

/**
 * Handle Errors
 *
 * Alerts the user to an error state, and console logs the error.
 *
 * @param {Error} error
 */
const handleErrors = (error) => {
  setError('Error: ' + error.message);
  console.error(error);
};

/**
 * Handle Signup
 *
 * Creates a new supabase user account.
 *
 * @see https://supabase.io/docs/reference/javascript/auth-signup
 *
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns
 */
export const handleSignup = async (credentials) => {
  setAlert(''); // Reset the alert
  const { email, password } = credentials;
  try {
    // Alert the user if no email/password provided
    if (!email || !password)
      throw new Error('Please provide both your email and password.');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setAlert('Signup successful, confirmation mail should be sent soon!');
  } catch (error) {
    handleErrors(error);
  }
};

/**
 * Handle Email Login
 *
 * Log in an existing supabase user via email & password.
 * If password is empty, it will send a magic link to the user's email address.
 *
 * @see https://supabase.io/docs/reference/javascript/auth-signin
 *
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 */
export const handleLogin = async (credentials) => {
  setAlert(''); // Reset the alert
  try {
    const { error, user, session } = await supabase.auth.signIn({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) throw error;
    // No error thrown, but no user detected, so magic link sent
    if (!error && !user) {
      setAlert('Check your email for the login link!');
      return;
    }
    console.log('EMAIL SIGNIN', user, session);
  } catch (error) {
    handleErrors(error);
  }
};

/**
 * Handle OAuth Login
 *
 * Log in a user via a third-party provider.
 *
 * @see https://supabase.io/docs/reference/javascript/auth-signin
 *
 * @param {string} provider - OAuth provider, eg 'github'
 */
export const handleOAuthLogin = async (provider) => {
  setAlert(''); // Reset the alert
  try {
    const { error, user, session } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    console.log('OAUTH SIGNIN', user, session);
  } catch (error) {
    handleErrors(error);
  }
};

/**
 * Handle Logout
 *
 * Log the current user out.
 *
 * @see https://supabase.io/docs/reference/javascript/auth-signout
 */
export const handleLogout = async () => {
  setAlert(''); // Reset the alert
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setAlert('You have signed out!');
  } catch (error) {
    handleErrors(error);
  }
};

/**
 * Handle Update User
 *
 * Updates the current user's password.
 *
 * @see https://supabase.io/docs/reference/javascript/auth-update
 *
 * @param {Object} credentials
 * @param {string} credentials.password
 */
export const handleUpdateUser = async (credentials) => {
  setAlert(''); // Reset the alert
  try {
    console.log(credentials);
    if (!credentials.password) throw new Error('Password is required.');
    const { error } = await supabase.auth.update(credentials);
    if (error) throw error;
    setAlert('User info updated.');
    window.location.href = '/'; // Return to the main app
  } catch (error) {
    handleErrors(error);
  }
};

/**
 * Handle Password Reset
 *
 * Sends a reset request to an email address.
 *
 * @see https://supabase.io/docs/reference/javascript/reset-password-email
 *
 * @param {string} email
 */
export const handlePasswordReset = async (email) => {
  setAlert(''); // Reset the alert
  try {
    if (!email) throw new Error('Email address is required.');
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) throw error;
    setAlert('Password recovery email has been sent.');
  } catch (error) {
    handleErrors(error);
  }
};
