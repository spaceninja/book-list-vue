<template>
  <AppAlert :alert="authAlert" />
  <main>
    <form
      class="form-widget"
      @submit.prevent="handleLogin({ email, password })"
    >
      <FormInput
        v-model="email"
        type="email"
        label="Email"
        placeholder="Your email"
      />
      <FormInput
        v-model="password"
        type="password"
        label="Password"
        placeholder="Your password"
      />
      <div>
        <AppButton class="primary" type="submit">
          {{ password.length ? 'Sign in' : 'Send magic link' }}
        </AppButton>
        <AppButton @click="handleSignup({ email, password })">
          Sign up
        </AppButton>
        <AppButton @click="handlePasswordReset(email)">
          Forgot your password?
        </AppButton>
      </div>
    </form>

    <h4>Or continue with</h4>
    <div>
      <AppButton @click="handleOAuthLogin('github')">
        Sign in with GitHub
      </AppButton>
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
import AppButton from './AppButton.vue';
import FormInput from './FormInput.vue';

export default {
  components: {
    AppAlert,
    AppButton,
    FormInput,
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
