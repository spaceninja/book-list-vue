<template>
  <AppAlert :alert="authAlert" />
  <form
    class="form-widget"
    @submit.prevent="handleUpdateUser({ password: password })"
  >
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
      <button type="submit" class="primary">Update password</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { authAlert, handleUpdateUser } from '../composables/useAuth';
import AppAlert from './AppAlert.vue';

export default {
  components: {
    AppAlert,
  },
  setup() {
    const password = ref('');

    return {
      password,
      authAlert,
      handleUpdateUser,
    };
  },
};
</script>
