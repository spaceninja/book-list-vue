<template>
  <AppHeader />
  <PasswordReset v-if="showPasswordReset" />
  <ProfileEdit v-else-if="store.user" />
  <AppAuth v-else />
  <AppFooter />
</template>

<script>
import { getParameterByName } from './lib/helpers';
import { supabase } from './lib/supabase';
import { store } from './store';
import AppAuth from './components/AppAuth.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import PasswordReset from './components/PasswordReset.vue';
import ProfileEdit from './components/ProfileEdit.vue';

export default {
  components: {
    AppAuth,
    AppHeader,
    AppFooter,
    PasswordReset,
    ProfileEdit,
  },
  setup() {
    // Check if the user is currently logged in, save to store
    store.user = supabase.auth.user();
    // Update store whenever an auth event happens.
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session?.user;
      console.log('UPDATED STORE', store.user);
    });
    return {
      store,
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
