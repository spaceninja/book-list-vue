import { ref } from 'vue';
import { supabase } from '../lib/supabase';

// TODO: No longer used, remove?
const userSession = ref(null);

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
  try {
    const { email, password } = credentials;
    // prompt user if they have not filled populated their credentials
    if (!email || !password) {
      alert('Please provide both your email and password.');
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
      console.error(error, error.message);
      return;
    }
    alert('Signup successful, confirmation mail should be sent soon!');
  } catch (err) {
    alert('Fatal error signing up');
    console.error('signup error', err);
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
  try {
    const { error, user } = await supabase.auth.signIn({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      alert('Error logging in: ' + error.message);
    }
    // No error throw, but no user detected so send magic link
    if (!error && !user) {
      alert('Check your email for the login link!');
    }
  } catch (error) {
    console.error('Error thrown:', error.message);
    alert(error.error_description || error);
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
  const { error } = await supabase.auth.signIn({ provider });
  if (error) console.error('Error: ', error.message);
}

/**
 * Handle Logout
 *
 * Log the current user out.
 *
 * @see https://supabase.io/docs/reference/javascript/auth-signout
 */
async function handleLogout() {
  console.log('logging out');
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Error signing out');
      console.error('Error', error);
      return;
    }
    alert('You have signed out!');
  } catch (err) {
    alert('Unknown error signing out');
    console.error('Error', err);
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
  try {
    const { error } = await supabase.auth.update(credentials);
    if (error) {
      alert('Error updating user info: ' + error.message);
    } else {
      alert('Successfully updated user info!');
      window.location.href = '/';
    }
  } catch (error) {
    alert('Error updating user info: ' + error.message);
  }
}

/**
 * Handle Password Reset
 *
 * Sends a reset request to an email address.
 *
 * @see https://supabase.io/docs/reference/javascript/reset-password-email
 */
async function handlePasswordReset() {
  const email = prompt('Please enter your email:');
  if (!email) {
    window.alert('Email address is required.');
  } else {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Password recovery email has been sent.');
    }
  }
}

export {
  userSession,
  handleLogin,
  handleOAuthLogin,
  handleSignup,
  handleLogout,
  handlePasswordReset,
  handleUpdateUser,
};
