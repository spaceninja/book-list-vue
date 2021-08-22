<template>
  <header class="header">
    <h1 class="header__logo">Books</h1>
    <nav>
      <AppButton v-if="userSession" @click="handleLogout"> Sign Out </AppButton>
    </nav>
  </header>
</template>

<script setup>
import { userSession, handleLogout } from '../../composables/useAuth';
import AppButton from '../AppButton/AppButton.vue';
</script>

<style lang="scss">
@import './TheHeader';
</style>
