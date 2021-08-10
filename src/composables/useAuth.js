import { ref } from 'vue';
import { supabase } from '../lib/supabase';

// Used to display a message to the user
const authAlert = ref('');

/**
 * Handle Errors
 *
 * Alerts the user to an error state, and logs the error
 *
 * @param {Error} error
 */
function handleErrors(error) {
  authAlert.value = 'Error: ' + error.message;
  console.error(error);
}

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
async function handleSignup(credentials) {
  // Reset the alert
  authAlert.value = '';
  const { email, password } = credentials;
  // Send request to supabase
  try {
    // Alert the user if no email/password provided
    if (!email || !password)
      throw new Error('Please provide both your email and password.');

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    authAlert.value =
      'Signup successful, confirmation mail should be sent soon!';
  } catch (error) {
    handleErrors(error);
  }
}

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
async function handleLogin(credentials) {
  // Reset the alert
  authAlert.value = '';
  // Send request to supabase
  try {
    const { error, user, session } = await supabase.auth.signIn({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    // No error thrown, but no user detected, so magic link sent
    if (!error && !user) {
      authAlert.value = 'Check your email for the login link!';
      return;
    }

    console.log('EMAIL SIGNIN', user, session);
  } catch (error) {
    handleErrors(error);
  }
}

/**
 * Handle OAuth Login
 *
 * Log in a user via a third-party provider.
 *
 * @see https://supabase.io/docs/reference/javascript/auth-signin
 *
 * @param {string} provider - OAuth provider, eg 'github'
 */
async function handleOAuthLogin(provider) {
  // Reset the alert
  authAlert.value = '';
  // Send request to supabase
  try {
    const { error, user, session } = await supabase.auth.signIn({ provider });

    if (error) throw error;

    console.log('OAUTH SIGNIN', user, session);
  } catch (error) {
    handleErrors(error);
  }
}

/**
 * Handle Logout
 *
 * Log the current user out.
 *
 * @see https://supabase.io/docs/reference/javascript/auth-signout
 */
async function handleLogout() {
  // Reset the alert
  authAlert.value = '';
  // Send request to supabase
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    authAlert.value = 'You have signed out!';
  } catch (error) {
    handleErrors(error);
  }
}

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
async function handleUpdateUser(credentials) {
  // Reset the alert
  authAlert.value = '';
  // Send request to supabase
  try {
    const { error } = await supabase.auth.update(credentials);

    if (error) throw error;

    authAlert.value = 'User info updated.';
    window.location.href = '/';
  } catch (error) {
    handleErrors(error);
  }
}

/**
 * Handle Password Reset
 *
 * Sends a reset request to an email address.
 *
 * @see https://supabase.io/docs/reference/javascript/reset-password-email
 *
 * @param {string} email
 */
async function handlePasswordReset(email) {
  // Reset the alert
  authAlert.value = '';
  // Send request to supabase
  try {
    // Alert the user if no email provided
    if (!email) throw new Error('Email address is required.');

    const { error } = await supabase.auth.api.resetPasswordForEmail(email);

    if (error) throw error;

    authAlert.value = 'Password recovery email has been sent.';
  } catch (error) {
    handleErrors(error);
  }
}

export {
  authAlert,
  handleLogin,
  handleOAuthLogin,
  handleSignup,
  handleLogout,
  handlePasswordReset,
  handleUpdateUser,
};
