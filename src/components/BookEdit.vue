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
