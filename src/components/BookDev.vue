<template>
  <button @click="addInitBooks">Add Init Book Set</button>
  <button @click="addSampleBooks">Add Sample Book Set</button>
  <button @click="deleteAllBooks">Delete All Books</button>
</template>

<script setup>
import {
  deleteAllBooks,
  addInitBooks,
  addSampleBooks,
} from '../composables/useBookDev';
</script>
