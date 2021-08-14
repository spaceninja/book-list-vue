<template>
  <AppHeader />
  <PasswordReset v-if="showPasswordReset" />
  <AppAuth v-else-if="userSession === null" />
  <div v-else>
    <slot></slot>
  </div>
  <AppFooter />
</template>

<script setup>
import { getParameterByName } from '../lib/helpers';
import { userSession } from '../composables/useAuth';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import AppAuth from '../components/AppAuth.vue';
import PasswordReset from '../components/PasswordReset.vue';
</script>

<script>
export default {
  computed: {
    showPasswordReset() {
      const requestType = getParameterByName('type', location.href);
      return requestType === 'recovery';
    },
  },
};
</script>
