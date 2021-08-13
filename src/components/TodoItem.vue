<template>
  <li>
    <div>
      <div>
        <div>
          {{ todo.task }}
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          :checked="todo['is_complete']"
          @click="updateTaskCompletion(todo, !todo['is_complete'])"
        />
      </div>
      <button @click="clearTodo">Delete</button>
    </div>
  </li>
</template>

<script>
import { defineComponent } from 'vue';
import {
  updateTaskCompletion,
  deleteTodo,
  allTodos,
} from '../composables/useTodo';

export default defineComponent({
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // Removes todo from supbase and also from app state
    function clearTodo() {
      deleteTodo(props.todo).then(() => {
        allTodos.value = allTodos.value.filter(
          (todo) => todo.id != props.todo.id
        );
      });
    }

    return { updateTaskCompletion, clearTodo };
  },
});
</script>
