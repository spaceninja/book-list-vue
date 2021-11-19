import { ref } from 'vue';
// import { supabase } from '../lib/supabase';
import { firebaseApp } from '../lib/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { setAlert, clearAlert, handleError } from './useAlert';

// Get a reference to the auth service
const auth = getAuth(firebaseApp);

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
  console.log('HANDLE SIGNUP', credentials);
  clearAlert();
  createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      console.log(
        'EMAIL SIGNUP SUCCESSFUL',
        userCredential,
        userCredential.user.email
      );
    })
    .catch((error) => {
      handleError(error);
    });
};

/**
 * Handle Email Login
 *
 * Log in an existing supabase user via email & password.
 * If password is empty, it will send a magic link to the user's email address.
 *
 * @see https://firebase.google.com/docs/reference/js/auth?authuser=0#signinwithemailandpassword
 *
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 */
export const handleLogin = async (credentials) => {
  console.log('HANDLE LOGIN', credentials);
  clearAlert();
  signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      console.log(
        'EMAIL SIGNIN SUCCESSFUL',
        userCredential,
        userCredential.user.email
      );
    })
    .catch((error) => {
      handleError(error);
    });
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
  console.log('HANDLE OAUTH LOGIN', provider);
  clearAlert();
  // try {
  //   const { error, user, session } = await supabase.auth.signIn({ provider });
  //   if (error) throw error;
  //   console.log('OAUTH SIGNIN', user, session);
  // } catch (error) {
  //   handleError(error);
  // }
};

/**
 * Handle Logout
 *
 * Log the current user out.
 *
 * @see https://firebase.google.com/docs/reference/js/auth?authuser=0#signout
 */
export const handleLogout = async () => {
  console.log('HANDLE LOGOUT');
  clearAlert();
  signOut(auth)
    .then(() => {
      setAlert('You have signed out!');
    })
    .catch((error) => {
      handleError(error);
    });
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
  console.log('HANDLE UPDATE USER', credentials);
  clearAlert();
  // try {
  //   console.log(credentials);
  //   if (!credentials.password) throw new Error('Password is required.');
  //   const { error } = await supabase.auth.update(credentials);
  //   if (error) throw error;
  //   setAlert('User info updated.');
  //   window.location.href = '/'; // Return to the main app
  // } catch (error) {
  //   handleError(error);
  // }
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
  console.log('HANDLE PASSWORD RESET', email);
  clearAlert();
  // try {
  //   if (!email) throw new Error('Email address is required.');
  //   const { error } = await supabase.auth.api.resetPasswordForEmail(email);
  //   if (error) throw error;
  //   setAlert('Password recovery email has been sent.');
  // } catch (error) {
  //   handleError(error);
  // }
};
