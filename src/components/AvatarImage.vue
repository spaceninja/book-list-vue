<template>
  <div>
    <img v-if="src" :src="src" alt="" class="avatar avatar--large image" />
    <div v-else class="avatar avatar--large no-image" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  src: {
    type: String,
    default: null,
  },
});
</script>
