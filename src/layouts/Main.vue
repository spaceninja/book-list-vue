<template>
  <AppHeader />
  <PasswordReset v-if="showPasswordReset" />
  <AppAuth v-else-if="userSession === null" />
  <div v-else>
    <slot></slot>
  </div>
  <AppFooter />
</template>

<script>
import { getParameterByName } from '../lib/helpers';
import { userSession } from '../composables/useAuth';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import AppAuth from '../components/AppAuth.vue';
import PasswordReset from '../components/PasswordReset.vue';
export default {
  components: {
    AppHeader,
    AppFooter,
    AppAuth,
    PasswordReset,
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
