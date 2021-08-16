<template>
  <h2 style="text-transform: capitalize">{{ editMode }} Book</h2>

  <form
    class="form-widget"
    @submit.prevent="
      editMode === 'add' ? addBook(currentBook) : editBook(currentBook)
    "
  >
    <FormInput
      v-model="currentBook.isbn"
      label="ISBN *"
      :help="isbnAlreadyUsed ? 'This ISBN has already been added!' : ''"
      required
    />
    <FormInput v-model="currentBook.title" label="Title *" required />
    <FormInput v-model="currentBook.series" label="Series" />
    <FormInput
      v-model="currentBook.author_fname"
      label="Author First Name"
      required
    />
    <FormInput
      v-model="currentBook.author_lname"
      label="Author Last Name"
      required
    />
    <FormInput
      v-model="currentBook.rating"
      type="number"
      append="/ 5"
      max="5"
      min="0"
      step="0.01"
      label="Rating"
      required
    />
    <FormInput
      v-model="currentBook.length"
      type="number"
      append="pages"
      label="Length"
      required
    />
    <FormInput
      v-model="currentBook.release_date"
      type="date"
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      label="Release Date"
    />
    <FormInput v-model="currentBook.thumbnail" label="Thumbnail" />
    <FormInput v-model="currentBook.source" label="Source" />
    <FormInput
      v-model="currentBook.blurb"
      type="textarea"
      help="A short blurb introducing the book."
      label="Blurb"
    />
    <FormInput
      v-model="currentBook.note"
      type="textarea"
      help="A note explaining why you’re interested in this book."
      label="Notes"
    />
    <FormInput
      v-model="currentBook.is_purchased"
      type="checkbox"
      label="Purchased?"
    />
    <FormInput
      v-model="currentBook.is_prioritized"
      type="checkbox"
      label="Prioritized?"
    />

    <div>
      <AppButton v-if="editMode === 'add'" class="primary" type="submit">
        Add
      </AppButton>
      <AppButton v-if="editMode === 'edit'" class="primary" type="submit">
        Edit
      </AppButton>
      <AppButton type="button" @click="exitEditMode">Cancel</AppButton>
    </div>
  </form>
</template>

<script setup>
import {
  currentBook,
  isbnAlreadyUsed,
  editMode,
  addBook,
  editBook,
  exitEditMode,
} from '../composables/useBook';
import FormInput from './FormInput.vue';
import AppButton from './AppButton.vue';
</script>
