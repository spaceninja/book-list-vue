import { createApp } from 'vue';
import App from './App.vue';
import { firebaseApp } from './lib/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { userSession } from './composables/useAuth';
import './assets/main.scss';

createApp(App).mount('#app');

/**
 * Keeps track of if the user is logged in or out
 * and will update userSession state accordingly.
 */
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    userSession.value = user;
    console.log('AUTH STATE CHANGE: LOGGED IN', userSession.value);
  } else {
    // User is signed out
    console.log('AUTH STATE CHANGE: LOGGED OUT', userSession.value);
  }
});
