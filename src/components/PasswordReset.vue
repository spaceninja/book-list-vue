<template>
  <AppAlert :alert="authAlert" />
  <form
    class="form-widget"
    @submit.prevent="handleUpdateUser({ password: password })"
  >
    <FormInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Your password"
    />
    <div>
      <AppButton type="submit" class="primary">Update password</AppButton>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { authAlert, handleUpdateUser } from '../composables/useAuth';
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
    const password = ref('');

    return {
      password,
      authAlert,
      handleUpdateUser,
    };
  },
};
</script>
