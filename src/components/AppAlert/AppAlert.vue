<template>
  <div v-if="alert.message" :class="['alert', `alert--${alert.type}`]">
    {{ alert.message }}
  </div>
</template>

<script setup>
defineProps({
  alert: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
@import './AppAlert';
</style>
