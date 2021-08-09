<template>
  <main>
    <div>
      <label for="auth-password">Password</label>
      <input
        id="auth-password"
        v-model="password"
        type="password"
        placeholder="Your password"
      />
    </div>

    <div>
      <button type="button" @click="handleUpdateUser({ password: password })">
        Update password
      </button>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import { handleUpdateUser } from '../vuetils/useAuth';

export default {
  setup() {
    const password = ref('');

    return {
      password,
      handleUpdateUser,
    };
  },
};
</script>
