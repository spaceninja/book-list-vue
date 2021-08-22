<template>
  <TheHeader />
  <AppAlert :alert="theAlert" />
  <AuthReset v-if="showPasswordReset" />
  <AuthForm v-else-if="userSession === null" />
  <BookList v-else />
  <TheFooter />
</template>

<script setup>
import { getParameterByName } from './utils/helpers';
import { userSession } from './composables/useAuth';
import { theAlert } from './composables/useAlert';
import AppAlert from './components/AppAlert/AppAlert.vue';
import TheHeader from './components/TheHeader/TheHeader.vue';
import TheFooter from './components/TheFooter/TheFooter.vue';
import AuthForm from './components/AuthForm/AuthForm.vue';
import AuthReset from './components/AuthReset/AuthReset.vue';
import BookList from './components/BookList/BookList.vue';
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
