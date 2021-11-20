import { ref } from 'vue';
import { firebaseApp } from '../lib/firebase';
import {
  GithubAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { setAlert, clearAlert, handleError } from './useAlert';

// Get a reference to the auth service
const auth = getAuth(firebaseApp);
const githubProvider = new GithubAuthProvider();

// Used to store the user session
export const userSession = ref(null);

/**
 * Handle Signup
 *
 * Creates a new user account.
 *
 * @see https://firebase.google.com/docs/reference/js/auth#createuserwithemailandpassword
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
    .then(() => {
      console.log('EMAIL SIGNUP SUCCESSFUL');
    })
    .catch((error) => {
      handleError(error);
    });
};

/**
 * Handle Email Login
 *
 * Log in an existing user via email & password.
 * If password is empty, it will send a magic link to the user's email address.
 *
 * @see https://firebase.google.com/docs/reference/js/auth#signinwithemailandpassword
 *
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 */
export const handleLogin = async (credentials) => {
  console.log('HANDLE LOGIN', credentials);
  clearAlert();
  signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(() => {
      console.log('EMAIL SIGNIN SUCCESSFUL');
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
 * @see https://firebase.google.com/docs/reference/js/auth#signinwithpopup
 */
export const handleGitHubLogin = async () => {
  console.log('HANDLE OAUTH LOGIN');
  clearAlert();
  signInWithPopup(auth, githubProvider)
    .then(() => {
      console.log('OAUTH SIGNIN SUCCESSFUL');
    })
    .catch((error) => {
      handleError(error);
    });
};

/**
 * Handle Logout
 *
 * Log the current user out.
 *
 * @see https://firebase.google.com/docs/reference/js/auth#signout
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
 * Handle Password Reset
 *
 * Sends a reset request to an email address.
 *
 * @see https://firebase.google.com/docs/reference/js/auth#sendpasswordresetemail
 *
 * @param {string} email
 */
export const handlePasswordReset = async (email) => {
  console.log('HANDLE PASSWORD RESET', email);
  clearAlert();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      setAlert('Password recovery email has been sent.');
    })
    .catch((error) => {
      handleError(error);
    });
};
