<template>
  <form class="form-widget" @submit.prevent="handleSubmit">
    {{ todo.task }}
    <FormInput
      v-model="task"
      label="New Todo Item"
      placeholder="What do you need to?"
    />
    <AppButton class="primary" type="submit">Add</AppButton>
    <AppButton type="button" @click="handleEdit">Edit</AppButton>
    <AppButton type="button" @click="handleCancel">Cancel</AppButton>
  </form>
</template>

<script setup>
import { onMounted, defineProps, ref, computed, watch } from 'vue';
import { addTodo } from '../composables/useTodo';
import FormInput from './FormInput.vue';
import AppButton from './AppButton.vue';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

// create local ref
const task = ref('');

// assemble local refs into a todo object for submission
const assembledTodo = computed(() => ({
  task: task.value,
}));

// populate local refs from props to avoid mutating props
const populateFromProps = () => {
  console.log('POPULATE FROM PROP', props.todo);
  task.value = props.todo.task;
};

// when the component mounts, copy the prop values to local refs
onMounted(() => {
  populateFromProps();
});

// if the prop changes, blow away our local refs with the prop values
watch(props, () => {
  console.log('PROP CHANGED');
  populateFromProps();
});

// on submit, create a new Todo from the local refs
const handleSubmit = async () => {
  console.log('ADD NEW TODO', assembledTodo.value);
  // const todo = await addTodo(editedTodo.value.task);
  // if (todo) task.value = ''; // if successful, clear the form
};

// on edit, update an existing Todo with the local refs
const handleEdit = async () => {
  console.log('EDIT TODO', assembledTodo.value);
  // const todo = await addTodo(editedTodo.value.task);
  // if (todo) task.value = ''; // if successful, clear the form
};

// on cancel, emit a cancel event to zero out the currentTodo one level up
// OR we could do it here by inheriting the currentTodo from useTodo?
const handleCancel = () => {
  console.log('CANCEL');
  // const todo = await addTodo(editedTodo.value.task);
  // if (todo) task.value = ''; // if successful, clear the form
};
</script>
