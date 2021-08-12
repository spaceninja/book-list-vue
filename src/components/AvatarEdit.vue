<template>
  <div>
    <label class="button primary" for="single">
      {{ isUploading ? 'Uploading ...' : 'Upload New Avatar' }}
    </label>
    <input
      id="single"
      style="position: absolute; visibility: hidden"
      type="file"
      accept="image/*"
      :disabled="isUploading"
      @change="uploadAvatar($event, emit)"
    />
  </div>
</template>

<script>
import { isUploading, uploadAvatar } from '../composables/useProfile';

export default {
  emits: ['upload'],
  setup(props, { emit }) {
    return {
      emit,
      isUploading,
      uploadAvatar,
    };
  },
};
</script>
