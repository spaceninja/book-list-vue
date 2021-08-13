<template>
  <div>
    <h1>Todo List.</h1>
    <div>
      <input v-model="task" type="text" placeholder="What do you need to?" />
      <button @click="insertTask">Add</button>
    </div>

    <div>
      <ul v-for="(todo, index) in allTodos" :key="index">
        <TodoItem :todo="todo" />
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import TodoItem from './TodoItem.vue';
import { allTodos, fetchTodos, addTodo } from '../composables/useTodo';
import { userSession } from '../composables/useAuth';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
  },

  setup() {
    onMounted(() => {
      fetchTodos();
    });

    const task = ref('');

    /**
     * Wrapper function adding a new todo for additional client side error handling.
     */
    async function insertTask() {
      // Guard for short task descriptions which will fail db policy.
      if (task.value.length <= 3) {
        alert('Please make your task a little more descriptive');
        return;
      }
      // Type check to ensure user is still logged in.
      if (userSession?.value === null) {
        alert('Please log in again');
        return;
      }
      try {
        const todo = await addTodo({
          user_id: userSession.value.user.id,
          task: task.value,
        });
        // If there was no response, dont do anything.
        if (!todo) {
          return;
        }
        // Otherwise push the response into allTodos.
        allTodos.value.push(todo);
      } catch (err) {
        console.error('Unknown error when adding todo', err);
      }
    }

    return {
      task,
      allTodos,
      insertTask,
      userSession,
    };
  },
};
</script>
