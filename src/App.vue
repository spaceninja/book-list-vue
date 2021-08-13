<template>
  <AppHeader />
  <PasswordReset v-if="showPasswordReset" />
  <AppAuth v-else-if="userSession === null" />
  <ProfileEdit v-else />
  <AppFooter />
</template>

<script>
import { getParameterByName } from './lib/helpers';
import { userSession } from './composables/useAuth';
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
    return {
      userSession,
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
