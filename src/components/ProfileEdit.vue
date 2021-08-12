<template>
  <AppAlert :alert="authAlert" />
  <form class="form-widget" @submit.prevent="updateProfile">
    <AvatarImage :src="avatarBlob" />
    <AvatarEdit @upload="updateProfile" />
    <FormInput :model-value="store.user?.email" label="Email" disabled />
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

<script>
import { onMounted, watch } from 'vue';
import { store } from '../store';
import { authAlert, handleLogout } from '../composables/useAuth';
import {
  isLoading,
  username,
  website,
  avatar_url,
  avatarBlob,
  getProfile,
  updateProfile,
  downloadAvatar,
} from '../composables/useProfile';
import AppAlert from './AppAlert.vue';
import AvatarEdit from './AvatarEdit.vue';
import AvatarImage from './AvatarImage.vue';
import AppButton from './AppButton.vue';
import FormInput from './FormInput.vue';

export default {
  components: {
    AppAlert,
    AvatarEdit,
    AvatarImage,
    AppButton,
    FormInput,
  },
  setup() {
    onMounted(() => {
      getProfile();
    });

    watch(avatar_url, () => {
      // downloadAvatar method writes to avatarBlob ref
      avatar_url.value ? downloadAvatar(avatar_url.value) : '';
    });

    return {
      store,
      authAlert,
      handleLogout,
      isLoading,
      username,
      website,
      avatar_url,
      avatarBlob,
      updateProfile,
    };
  },
};
</script>
