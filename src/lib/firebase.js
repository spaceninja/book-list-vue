// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// TODO: move to .env
const firebaseConfig = {
  apiKey: 'AIzaSyA-5tojAEBlkSLR-xwNFALegJw_A5Ch-WY',
  authDomain: 'spaceninja-book-list-dev.firebaseapp.com',
  databaseURL: 'https://spaceninja-book-list-dev.firebaseio.com',
  projectId: 'spaceninja-book-list-dev',
  storageBucket: 'spaceninja-book-list-dev.appspot.com',
  messagingSenderId: '340949330740',
  appId: '1:340949330740:web:9c8bb2f8fe83b8242e1361',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
