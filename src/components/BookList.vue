<template>
  <BookEdit v-if="editMode" />

  <div v-else>
    <h2>Book List</h2>
    <button type="button" @click="enterAddBookMode">Add New Book</button>
    <ol>
      <li v-if="isLoading">Loading…</li>
      <li v-else-if="!allBooks.length">No books found</li>
      <BookCard
        v-for="book in allBooks"
        :key="book.isbn"
        v-bind="book"
        :book="book"
      />
    </ol>
    <BookDev v-if="isDev" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import {
  allBooks,
  isLoading,
  editMode,
  fetchBooks,
  enterAddBookMode,
} from '../composables/useBook';
import BookDev from './BookDev.vue';
import BookEdit from './BookEdit.vue';
import BookCard from './BookCard.vue';

const isDev = import.meta.env.DEV;

onMounted(() => {
  fetchBooks();
});
</script>
