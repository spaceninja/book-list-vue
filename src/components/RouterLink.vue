<template>
  <a :href="href" @click.prevent="go">
    <slot></slot>
  </a>
</template>

<script>
import { routes } from '../routes';
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  methods: {
    // @see https://github.com/phanan/vue-3.0-simple-routing-example
    go() {
      this.$root.currentRoute = this.href;
      window.history.pushState(null, routes[this.href]?.name, this.href);
    },
  },
};
</script>
