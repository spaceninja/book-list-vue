<template>
  <a :href="href" @click.prevent="go">
    <slot></slot>
  </a>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>

<script>
import { routes } from '../../routes';

export default {
  methods: {
    // @see https://github.com/phanan/vue-3.0-simple-routing-example
    go() {
      this.$root.currentRoute = this.href;
      window.history.pushState(null, routes[this.href]?.name, this.href);
    },
  },
};
</script>
