<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <PasswordReset v-if="showPasswordReset" />
    <Auth v-else-if="store.user === null" />
    <Profile v-else />
    <Footer />
  </div>
</template>

<script>
import { store } from './store';
import { supabase } from './lib/supabase';
import { handleLogout } from './composables/useAuth';
import { getParameterByName } from './lib/helpers';
import Auth from './components/Auth.vue';
import Footer from './components/Footer.vue';
import PasswordReset from './components/PasswordReset.vue';
import Profile from './components/Profile.vue';

export default {
  components: {
    Auth,
    Footer,
    PasswordReset,
    Profile,
  },
  setup() {
    // Check if the user is currently logged in, save to store
    store.user = supabase.auth.user();
    // Update store whenever an auth event happens.
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user;
    });
    return {
      store,
      handleLogout,
    };
  },
  computed: {
    showPasswordReset() {
      const requestType = getParameterByName('type', location.href);
      return requestType === 'recovery';
    },
  },
};
</script>
