<template>
  <AppAlert :alert="authAlert" />
  <main>
    <form
      class="form-widget"
      @submit.prevent="handleLogin({ email, password })"
    >
      <div>
        <label for="auth-email">Email</label>
        <input
          id="auth-email"
          v-model="email"
          type="text"
          placeholder="Your email"
        />
      </div>
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
        <button class="primary" type="submit">
          {{ password.length ? 'Sign in' : 'Send magic link' }}
        </button>
        <button type="button" @click="handleSignup({ email, password })">
          Sign up
        </button>
        <button type="button" @click="handlePasswordReset(email)">
          Forgot your password?
        </button>
      </div>
    </form>

    <h4>Or continue with</h4>
    <div>
      <button type="button" @click="handleOAuthLogin('github')">
        Sign in with GitHub
      </button>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import {
  authAlert,
  handleLogin,
  handleOAuthLogin,
  handleSignup,
  handlePasswordReset,
} from '../composables/useAuth';
import AppAlert from './AppAlert.vue';

export default {
  components: {
    AppAlert,
  },
  setup() {
    const email = ref('');
    const password = ref('');

    return {
      email,
      password,
      authAlert,
      handleLogin,
      handleOAuthLogin,
      handleSignup,
      handlePasswordReset,
    };
  },
};
</script>
