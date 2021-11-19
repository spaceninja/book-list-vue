<template>
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
        <AppButton class="button--primary" type="submit">Sign in</AppButton>
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
      <AppButton @click="handleGitHubLogin()">Sign in with GitHub</AppButton>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import {
  handleLogin,
  handleGitHubLogin,
  handleSignup,
  handlePasswordReset,
} from '../../composables/useAuth';
import AppButton from '../AppButton/AppButton.vue';
import FormInput from '../FormInput/FormInput.vue';

const email = ref('');
const password = ref('');
</script>
