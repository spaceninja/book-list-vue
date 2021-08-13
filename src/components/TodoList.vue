<template>
  <div>
    <h1>Todo List.</h1>
    <FormInput
      v-model="task"
      label="New Todo Item"
      placeholder="What do you need to?"
    />
    <AppButton @click="insertTask(task)">Add</AppButton>

    <ul v-for="todo in allTodos" :key="todo.id">
      <TodoItem :todo="todo" />
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { allTodos, fetchTodos, insertTask } from '../composables/useTodo';
import TodoItem from './TodoItem.vue';
import FormInput from './FormInput.vue';
import AppButton from './AppButton.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    FormInput,
    AppButton,
  },

  setup() {
    onMounted(() => {
      fetchTodos();
    });

    const task = ref('');

    return {
      task,
      allTodos,
      insertTask,
    };
  },
};
</script>
