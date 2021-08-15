<template>
  <BookEdit v-if="editMode" />

  <div v-else>
    <h2>Book List</h2>
    <button type="button" @click="enterAddBookMode">Add New Book</button>
    <ul>
      <li v-if="isLoading">Loading…</li>
      <li v-if="!allBooks.length">No books found</li>
      <li v-for="book in allBooks" :key="book.id">
        {{ book.id }} - {{ book.isbn }} - {{ book.title }}
        <button type="button" @click="enterEditBookMode(book)">Edit</button>
        <button type="button" @click="deleteBook(book)">Delete</button>
      </li>
    </ul>
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
  enterEditBookMode,
  deleteBook,
} from '../composables/useBook';
import BookEdit from './BookEdit.vue';

onMounted(() => {
  fetchBooks();
});
</script>
