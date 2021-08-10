import { ref } from 'vue';
import { supabase } from '../lib/supabase';

// Used to display a message to the user
const authAlert = ref('');

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
  // Return early and prompt the user if no email/password provided
  if (!email || !password) {
    authAlert.value = 'Please provide both your email and password.';
    return;
  }
  // Send request to supabase
  try {
    const { error } = await supabase.auth.signUp({ email, password });
    // handle error
    if (error) {
      authAlert.value = 'Error signing up: ' + error.message;
      console.error(error, error.message);
      return;
    }
    // handle success
    authAlert.value =
      'Signup successful, confirmation mail should be sent soon!';
  } catch (asyncError) {
    authAlert.value = 'Error connecting to Supabase!';
    console.error('Supabase Error:', asyncError);
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
    // handle error
    if (error) {
      authAlert.value = 'Error logging in: ' + error.message;
      console.error(error, error.message);
      return;
    }
    // handle no error throw, but no user detected, so magic link sent
    if (!error && !user) {
      authAlert.value = 'Check your email for the login link!';
      return;
    }
    // handle success
    console.log('EMAIL SIGNIN', user, session);
  } catch (asyncError) {
    authAlert.value = 'Error connecting to Supabase!';
    console.error('Supabase Error:', asyncError);
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
    // handle error
    if (error) {
      authAlert.value = 'Error logging in: ' + error.message;
      console.error(error, error.message);
      return;
    }
    // handle success
    console.log('OAUTH SIGNIN', user, session);
  } catch (asyncError) {
    authAlert.value = 'Error connecting to Supabase!';
    console.error('Supabase Error:', asyncError);
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
    // handle error
    if (error) {
      authAlert.value = 'Error signing out: ' + error.message;
      console.error(error, error.message);
      return;
    }
    // handle success
    authAlert.value = 'You have signed out!';
  } catch (asyncError) {
    authAlert.value = 'Error connecting to Supabase!';
    console.error('Supabase Error:', asyncError);
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
    // handle error
    if (error) {
      authAlert.value = 'Error updating user info: ' + error.message;
      console.error(error, error.message);
      return;
    }
    // handle success
    authAlert.value = 'User info updated.';
    window.location.href = '/';
  } catch (asyncError) {
    authAlert.value = 'Error connecting to Supabase!';
    console.error('Supabase Error:', asyncError);
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
  // Return early and prompt the user if no email provided
  if (!email) {
    authAlert.value = 'Email address is required.';
    return;
  }
  // Send request to supabase
  try {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    // handle error
    if (error) {
      authAlert.value = 'Error resetting password: ' + error.message;
      console.error(error, error.message);
      return;
    }
    // handle success
    authAlert.value = 'Password recovery email has been sent.';
  } catch (asyncError) {
    authAlert.value = 'Error connecting to Supabase!';
    console.error('Supabase Error:', asyncError);
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
