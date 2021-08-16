<template>
  <li
    class="book"
    :class="{
      'book--prioritized': is_prioritized,
      'book--purchased': is_purchased,
    }"
  >
    <div class="book__thumbnail">
      <img
        v-if="thumbnail"
        :src="thumbnail"
        alt=""
        class="book__thumbnail-media"
      />
    </div>
    <div class="book__info">
      <h2 class="book__headline">
        <span class="book__title">{{ title }}</span>
        <span v-if="series" class="book__series">({{ series }})</span>
      </h2>
      <p class="book__author">by {{ author_fname }} {{ author_lname }}</p>
      <p class="book__rating num">
        <span class="sr-only">Rating:</span> {{ rating }}
      </p>
      <p class="book__length num">
        <span class="sr-only">Length:</span> {{ length }}p
      </p>
      <blockquote v-if="blurb">
        <p class="book__snippet">{{ blurb }}</p>
      </blockquote>
      <p v-if="source || note" class="book__recommendation">
        <span v-if="source" class="book__source"
          >Recommended by {{ source }}</span
        ><span v-if="source && note">: </span
        ><q v-if="note" class="book__note">{{ note }}</q>
      </p>
    </div>
    <div class="book__actions">
      <AppButton
        class="button--icon-only button--primary"
        @click="enterEditBookMode(book)"
      >
        <span aria-hidden="true" class="button__icon">✏️</span>
        <span class="sr-only">Edit</span>
      </AppButton>
      <AppButton
        class="button--icon-only button--secondary"
        @click="deleteBook(book)"
      >
        <span aria-hidden="true" class="button__icon">❌</span>
        <span class="sr-only">Delete</span>
      </AppButton>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';
import { enterEditBookMode, deleteBook } from '../composables/useBook';
import AppButton from './AppButton.vue';

/* eslint-disable vue/prop-name-casing */
defineProps({
  book: {
    type: Object,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  series: {
    type: String,
    default: null,
  },
  author_fname: {
    type: String,
    default: null,
  },
  author_lname: {
    type: String,
    default: null,
  },
  rating: {
    type: String,
    default: null,
  },
  length: {
    type: String,
    default: null,
  },
  release_date: {
    type: String,
    default: null,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  blurb: {
    type: String,
    default: null,
  },
  source: {
    type: String,
    default: null,
  },
  note: {
    type: String,
    default: null,
  },
  is_purchased: {
    type: Boolean,
    default: false,
  },
  is_prioritized: {
    type: Boolean,
    default: false,
  },
});
</script>
