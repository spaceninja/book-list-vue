<template>
  <form class="row flex flex-center" @submit.prevent="handleEmailLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input
          v-model="email"
          class="inputField"
          type="email"
          placeholder="Your email"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
      <div>
        <button type="button" class="button block" @click="handleGitHubLogin">
          {{ loading ? 'Loading' : 'Sign in with GitHub' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase';

export default {
  setup() {
    const loading = ref(false);
    const email = ref('');

    const handleEmailLogin = async () => {
      try {
        loading.value = true;
        const { error } = await supabase.auth.signIn({ email: email.value });
        if (error) throw error;
        alert('Check your email for the login link!');
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        loading.value = false;
      }
    };

    const handleGitHubLogin = async () => {
      try {
        loading.value = true;
        const { error } = await supabase.auth.signIn({ provider: 'github' });
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      email,
      handleEmailLogin,
      handleGitHubLogin,
    };
  },
};
</script>
