<template>
  <div v-if="authAlert" class="alert">{{ authAlert }}</div>
  <form class="form-widget" @submit.prevent="updateProfile">
    <Avatar v-model:path="avatar_url" @upload="updateProfile" />
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" :value="store.user.email" disabled />
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
      <button type="submit" class="primary" :disabled="loading">
        {{ loading ? 'Loading...' : 'Update' }}
      </button>
    </div>

    <div>
      <button type="button" :disabled="loading" @click="handleLogout">
        Sign Out
      </button>
    </div>
  </form>
</template>

<script>
import { onMounted } from 'vue';
import { store } from '../store';
import { authAlert, handleLogout } from '../composables/useAuth';
import {
  loading,
  username,
  website,
  avatar_url,
  getProfile,
  updateProfile,
} from '../composables/useProfile';
import Avatar from './Avatar.vue';

export default {
  components: {
    Avatar,
  },
  setup() {
    onMounted(() => {
      getProfile();
    });

    return {
      store,
      authAlert,
      handleLogout,
      loading,
      username,
      website,
      avatar_url,
      updateProfile,
    };
  },
};
</script>
