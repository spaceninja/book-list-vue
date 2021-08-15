<template>
  <div>
    <h1>Book List.</h1>
    <BookEdit v-if="currentTodo" :todo="currentTodo" />

    <ul>
      <li v-for="todo in allTodos" :key="todo.id">
        {{ JSON.stringify(todo, null, 2) }}
        <button type="button" @click="editTodo(todo)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { allTodos, fetchTodos } from '../composables/useTodo';
import BookEdit from './BookEdit.vue';

onMounted(() => {
  fetchTodos();
});

const currentTodo = ref(null);

const editTodo = (todo) => {
  console.log('EDIT TODO', todo);
  currentTodo.value = todo;
  console.log('CURRENT TODO', currentTodo.value);
};
</script>
