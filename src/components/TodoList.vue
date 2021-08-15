<template>
  <div>
    <h1>Todo List.</h1>
    <form class="form-widget" @submit.prevent="handleSubmit">
      <FormInput
        v-model="task"
        label="New Todo Item"
        placeholder="What do you need to?"
      />
      <AppButton class="primary" type="submit">Add</AppButton>
    </form>

    <ul>
      <li v-for="todo in allTodos" :key="todo.id">
        <TodoItem :todo="todo" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { allTodos, fetchTodos, addTodo } from '../composables/useTodo';
import TodoItem from './TodoItem.vue';
import FormInput from './FormInput.vue';
import AppButton from './AppButton.vue';

onMounted(() => {
  fetchTodos();
});

const task = ref('');

const handleSubmit = async () => {
  const todo = await addTodo(task.value);
  if (todo) task.value = ''; // if successful, clear the form
};
</script>
