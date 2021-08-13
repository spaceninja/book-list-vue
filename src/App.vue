<template>
  <AppHeader />
  <PasswordReset v-if="showPasswordReset" />
  <AppAuth v-else-if="userSession === null" />
  <div v-else>
    <Suspense>
      <template #default>
        <div>
          <TodoList />
          <button @click="handleLogout">Logout</button>
        </div>
      </template>
      <template #fallback>
        <AppLoading />
      </template>
    </Suspense>
  </div>
  <!-- <ProfileEdit v-else /> -->
  <AppFooter />
</template>

<script>
import { getParameterByName } from './lib/helpers';
import { userSession, handleLogout } from './composables/useAuth';
import AppAuth from './components/AppAuth.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppLoading from './components/AppLoading.vue';
import PasswordReset from './components/PasswordReset.vue';
// import ProfileEdit from './components/ProfileEdit.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    AppAuth,
    AppHeader,
    AppFooter,
    AppLoading,
    PasswordReset,
    // ProfileEdit,
    TodoList,
  },
  setup() {
    return {
      userSession,
      handleLogout,
    };
  },
  computed: {
    showPasswordReset() {
      const requestType = getParameterByName('type', location.href);
      return requestType === 'recovery';
    },
  },
};
</script>
