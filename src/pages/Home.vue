<template>
  <MainLayout>
    <TodoList />
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/Main.vue';
import TodoList from '../components/TodoList.vue';

export default {
  components: {
    MainLayout,
    TodoList,
  },
};
</script>
