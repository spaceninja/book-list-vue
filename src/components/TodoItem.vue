<template>
  <li>
    <FormInput
      :checked="todo['is_complete']"
      type="checkbox"
      :label="todo.task"
      @click="updateTaskCompletion(todo, !todo['is_complete'])"
    />
    <AppButton @click="deleteTodo(todo)">Delete</AppButton>
  </li>
</template>

<script>
import { updateTaskCompletion, deleteTodo } from '../composables/useTodo';
import FormInput from './FormInput.vue';
import AppButton from './AppButton.vue';

export default {
  components: { FormInput, AppButton },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return { updateTaskCompletion, deleteTodo };
  },
};
</script>
