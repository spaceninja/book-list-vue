<template>
  <ProfileEdit v-if="isEditingProfile" />
  <BookEdit v-else-if="editMode" />
  <BookList v-else />
</template>

<script setup>
import { editMode } from '../../composables/useBook';
import { isEditingProfile } from '../../composables/useProfile';
import ProfileEdit from '../ProfileEdit/ProfileEdit.vue';
import BookEdit from '../BookEdit/BookEdit.vue';
import BookList from '../BookList/BookList.vue';
</script>
