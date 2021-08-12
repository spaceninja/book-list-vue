<template>
  <AppAlert :alert="authAlert" />
  <form class="form-widget" @submit.prevent="updateProfile">
    <AvatarImage :src="avatarBlob" />
    <AvatarEdit @upload="updateProfile" />
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" :value="store.user?.email" disabled />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" v-model="username" type="text" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" v-model="website" type="url" />
    </div>

    <div>
      <button type="submit" class="primary" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : 'Update' }}
      </button>
    </div>

    <div>
      <button type="button" :disabled="isLoading" @click="handleLogout">
        Sign Out
      </button>
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

export default {
  components: {
    AppAlert,
    AvatarEdit,
    AvatarImage,
  },
  setup() {
    onMounted(() => {
      getProfile();
    });

    watch(avatar_url, () => {
      // downloadAvatar writes to avatarBlob
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
