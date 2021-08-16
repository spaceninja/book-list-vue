<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <AvatarImage :src="avatarBlob" />
    <AvatarEdit @upload="updateProfile" />
    <FormInput :model-value="userSession.user?.email" label="Email" disabled />
    <FormInput v-model="username" label="Name" placeholder="Your name" />
    <FormInput
      v-model="website"
      type="url"
      label="Website"
      placeholder="Your website"
    />
    <div>
      <AppButton type="submit" class="primary" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : 'Update' }}
      </AppButton>
    </div>
    <div>
      <AppButton :disabled="isLoading" @click="handleLogout">
        Sign Out
      </AppButton>
    </div>
  </form>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { userSession, handleLogout } from '../../composables/useAuth';
import {
  isLoading,
  username,
  website,
  avatar_url,
  avatarBlob,
  getProfile,
  updateProfile,
  downloadAvatar,
} from '../../composables/useProfile';
import AvatarEdit from '../AvatarEdit/AvatarEdit.vue';
import AvatarImage from '../AvatarImage/AvatarImage.vue';
import AppButton from '../AppButton/AppButton.vue';
import FormInput from '../FormInput/FormInput.vue';

onMounted(() => {
  getProfile();
});

watch(avatar_url, () => {
  // downloadAvatar method writes to avatarBlob ref
  avatar_url.value ? downloadAvatar(avatar_url.value) : '';
});
</script>
