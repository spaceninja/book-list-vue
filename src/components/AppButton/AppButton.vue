<template>
  <button :type="$attrs.type || 'button'" class="button">
    <slot />
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import './AppButton';
</style>
