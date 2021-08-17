<template>
  <BookEdit v-if="editMode" />

  <div v-else>
    <BookControls />
    <ol class="book-list">
      <li v-if="isLoading">Loading…</li>
      <li v-else-if="!sortedAndFilteredBooks.length">No books found</li>
      <BookCard
        v-for="book in sortedAndFilteredBooks"
        :key="book.isbn"
        v-bind="book"
        :book="book"
      />
    </ol>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import {
  sortedAndFilteredBooks,
  isLoading,
  editMode,
  fetchBooks,
} from '../../composables/useBook';
import BookEdit from '../BookEdit/BookEdit.vue';
import BookControls from '../BookControls/BookControls.vue';
import BookCard from '../BookCard/BookCard.vue';

onMounted(() => {
  fetchBooks();
});
</script>

<style lang="scss">
@import './BookList';
</style>
