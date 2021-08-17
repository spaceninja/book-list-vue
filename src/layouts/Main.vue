<template>
  <TheHeader />
  <AppAlert :alert="theAlert" />
  <PasswordReset v-if="showPasswordReset" />
  <AuthForm v-else-if="userSession === null" />
  <div v-else>
    <slot></slot>
  </div>
  <TheFooter />
</template>

<script setup>
import { getParameterByName } from '../utils/helpers';
import { userSession } from '../composables/useAuth';
import { theAlert } from '../composables/useAlert';
import AppAlert from '../components/AppAlert/AppAlert.vue';
import TheHeader from '../components/TheHeader/TheHeader.vue';
import TheFooter from '../components/TheFooter/TheFooter.vue';
import AuthForm from '../components/AuthForm/AuthForm.vue';
import PasswordReset from '../components/PasswordReset/PasswordReset.vue';
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
