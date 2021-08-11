<template>
  <div v-if="alert.message" :class="['alert', `alert--${alert.type}`]">
    {{ alert.message }}
  </div>
</template>

<script>
export default {
  props: {
    alert: {
      type: Object,
      required: true,
    },
  },
};
</script>
