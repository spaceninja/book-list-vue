import { createApp } from 'vue';
import App from './App.vue';
import { supabase } from './lib/supabase';
import { userSession } from './composables/useAuth';
import './assets/main.css';

createApp(App).mount('#app');

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session;
});
