<template>
  <header class="mainHeader">
    <p>Book List Vue</p>
    <nav>
      <ul>
        <li><RouterLink href="/">Home</RouterLink></li>
        <li><RouterLink href="/profile">Profile</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import RouterLink from '../components/RouterLink.vue';

export default {
  components: {
    RouterLink,
  },
};
</script>
