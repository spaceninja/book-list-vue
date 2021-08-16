import { createApp, h } from 'vue';
import { routes } from './routes';
import { supabase } from './lib/supabase';
import { userSession } from './composables/useAuth';
import NotFound from './pages/NotFound.vue';
import './assets/main.scss';

/**
 * Simple Router App
 *
 * @see https://v3.vuejs.org/guide/routing.html
 */
const SimpleRouterApp = {
  data: () => ({
    currentRoute: window.location.pathname,
  }),
  computed: {
    CurrentComponent() {
      return routes[this.currentRoute]?.component || NotFound;
    },
  },
  render() {
    return h(this.CurrentComponent);
  },
  created() {
    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname;
    });
  },
};

createApp(SimpleRouterApp).mount('#app');

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session;
});
