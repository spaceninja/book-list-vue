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
        loading="lazy"
      />
    </div>
    <div class="book__info">
      <h2 class="book__headline">
        <span class="book__title">{{ title }}</span>
        {{ ' ' /* ensure a space between title and series */ }}
        <span v-if="series" class="book__series">({{ widontSeries }})</span>
      </h2>
      <p class="book__author">by {{ author_fname }} {{ author_lname }}</p>
      <p class="book__rating num">
        <span class="sr-only">Rating:</span> {{ rating }}
      </p>
      <p class="book__length num">
        <span class="sr-only">Length:</span> {{ length }}p
      </p>
      <ul v-if="releaseYear || tags" class="book__tags" role="list">
        <li v-if="releaseYear" class="book__tag">{{ releaseYear }}</li>
        <li v-for="tag in tags" :key="tag" class="book__tag">
          {{ tag }}
        </li>
      </ul>
      <details class="book__details">
        <summary>Details</summary>
        <blockquote v-if="blurb">
          <p class="book__snippet">{{ blurb }}</p>
        </blockquote>
        <p v-if="source || note" class="book__recommendation">
          <span v-if="source" class="book__source"
            >Recommended by {{ source }}</span
          ><span v-if="source && note">: </span
          ><q v-if="note" class="book__note">{{ note }}</q>
        </p>
        <p v-if="release_date" class="book__date">
          Published <time :datetime="release_date">{{ formattedDate }}</time>
        </p>
      </details>
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
        @click="confirmDelete(book)"
      >
        <span aria-hidden="true" class="button__icon">❌</span>
        <span class="sr-only">Delete</span>
      </AppButton>
    </div>
  </li>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { widont } from '../../utils/helpers';
import { enterEditBookMode, deleteBook } from '../../composables/useBook';
import AppButton from '../AppButton/AppButton.vue';

const confirmDelete = (book) => {
  if (confirm(`Are you sure you want to delete ${book.title}?`)) {
    deleteBook(book);
  }
};

const widontSeries = computed(() => {
  return widont(props.series);
});

const formattedDate = computed(() => {
  const date = new Date(props.release_date);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
});

const releaseYear = computed(() => {
  if (!props.release_date) return null;
  const date = new Date(props.release_date);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    timeZone: 'UTC',
  });
});

/* eslint-disable vue/prop-name-casing */
const props = defineProps({
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
  tags: {
    type: Array,
    default: null,
  },
});
</script>

<style lang="scss">
@import './BookCard';
</style>
