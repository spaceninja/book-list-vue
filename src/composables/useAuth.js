import { ref } from 'vue';
import { supabase } from '../lib/supabase';
import { setAlert, clearAlert, handleError } from './useAlert';

// Used to store the user session
export const userSession = ref(null);

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
  clearAlert();
  const { email, password } = credentials;
  try {
    // Alert the user if no email/password provided
    if (!email || !password)
      throw new Error('Please provide both your email and password.');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setAlert('Signup successful, confirmation mail should be sent soon!');
  } catch (error) {
    handleError(error);
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
  clearAlert();
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
    handleError(error);
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
  clearAlert();
  try {
    const { error, user, session } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    console.log('OAUTH SIGNIN', user, session);
  } catch (error) {
    handleError(error);
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
  clearAlert();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setAlert('You have signed out!');
  } catch (error) {
    handleError(error);
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
  clearAlert();
  try {
    console.log(credentials);
    if (!credentials.password) throw new Error('Password is required.');
    const { error } = await supabase.auth.update(credentials);
    if (error) throw error;
    setAlert('User info updated.');
    window.location.href = '/'; // Return to the main app
  } catch (error) {
    handleError(error);
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
  clearAlert();
  try {
    if (!email) throw new Error('Email address is required.');
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) throw error;
    setAlert('Password recovery email has been sent.');
  } catch (error) {
    handleError(error);
  }
};
