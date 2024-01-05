<template>
  <form class="book-controls">
    <div class="book-controls__add">
      <AppButton @click="enterAddBookMode">Add New Book</AppButton>
      <AppButton v-if="isDev" @click="addInitBooks"> Add Init Books </AppButton>
      <AppButton v-if="isDev" @click="addSampleBooks">
        Add Sample Books
      </AppButton>
      <AppButton v-if="isDev" @click="deleteAllBooks">
        Delete All Books
      </AppButton>
    </div>
    <div class="book-controls__sort">
      <label for="sort" class="sort__label">Sort by:</label>
      <select id="sort" class="sort__control" name="sort" @change="setSort">
        <option
          v-for="option in sortOptions"
          :key="option.firstBy"
          :value="option.firstBy"
          :selected="option.firstBy === sortBy.firstBy"
        >
          {{ option.display }}
        </option>
      </select>
    </div>
    <div class="book-controls__filter">
      <AppButton
        :aria-expanded="isFilterMenuOpen"
        aria-controls="filter-list"
        type="button"
        @click="isFilterMenuOpen = !isFilterMenuOpen"
      >
        Filters
        <small>
          ({{ sortedAndFilteredBooksCount
          }}<span v-if="filterBy.length">/{{ allBooksCount }}</span> books)
        </small>
      </AppButton>
      <ul id="filter-list" :hidden="!isFilterMenuOpen" class="filter-list">
        <li
          v-for="option in filterOptions"
          :key="option.filterBy"
          class="filter-list__item"
          :class="{
            'filter-list__item--purchased': option.filterBy === 'is_purchased',
            'filter-list__item--prioritize':
              option.filterBy === 'is_prioritized',
          }"
        >
          <input
            :id="option.filterBy"
            class="filter-list__checkbox"
            :checked="filterBy.includes(option.filterBy)"
            type="checkbox"
            :name="option.filterBy"
            @change="setFilter"
          />
          <label class="filter-list__label" :for="option.filterBy">
            {{ option.display }}
          </label>
        </li>
      </ul>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { filterOptions } from '../../utils/filter-options';
import { sortOptions } from '../../utils/sort-options';
import {
  sortedAndFilteredBooksCount,
  allBooksCount,
  sortBy,
  filterBy,
  setFilter,
  setSort,
  enterAddBookMode,
} from '../../composables/useBook';
import {
  deleteAllBooks,
  addInitBooks,
  addSampleBooks,
} from '../../composables/useBookDev';
import AppButton from '../AppButton/AppButton.vue';

const isDev = import.meta.env.DEV;
const isFilterMenuOpen = ref(false);
</script>

<style lang="scss">
@import './BookControls';
</style>
