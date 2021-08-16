<template>
  <header class="header">
    <h1 class="header__logo"><RouterLink href="/">Books</RouterLink></h1>
    <nav>
      <ul>
        <li><RouterLink href="/">Books</RouterLink></li>
        <li><RouterLink href="/profile">Profile</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import RouterLink from '../RouterLink/RouterLink.vue';
</script>

<style lang="scss">
@import './TheHeader';
</style>
