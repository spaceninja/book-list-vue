<template>
  <li class="flex">
    <FormInput
      :checked="todo['is_complete']"
      type="checkbox"
      :label="todo.task"
      @click="updateTodoCompletion(todo, !todo['is_complete'])"
    />
    <AppButton @click="deleteTodo(todo)">Delete</AppButton>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';
import { updateTodoCompletion, deleteTodo } from '../composables/useTodo';
import FormInput from './FormInput.vue';
import AppButton from './AppButton.vue';

defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
</script>
