<template>
  <TheHeader />
  <AppAlert :alert="theAlert" />
  <AuthForm v-if="userSession === null" />
  <BookList v-else />
  <TheFooter />
</template>

<script setup>
import { userSession } from './composables/useAuth';
import { theAlert } from './composables/useAlert';
import AppAlert from './components/AppAlert/AppAlert.vue';
import TheHeader from './components/TheHeader/TheHeader.vue';
import TheFooter from './components/TheFooter/TheFooter.vue';
import AuthForm from './components/AuthForm/AuthForm.vue';
import BookList from './components/BookList/BookList.vue';
</script>
