<template>
  <div v-if="alert.message" :class="['alert', `alert--${alert.type}`]">
    {{ alert.message }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  alert: {
    type: Object,
    required: true,
  },
});
</script>
