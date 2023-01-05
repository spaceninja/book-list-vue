<template>
  <form class="book-controls">
    <div class="book-controls__add">
      <AppButton @click="enterAddBookMode">Add New Book</AppButton>
      <AppButton v-if="isDev" @click="addInitBooks"> Add Init Books </AppButton>
      <AppButton v-if="isDev" @click="addSampleBooks">
        Add Sample Books
      </AppButton>
      <AppButton v-if="isDev" @click="addSupabaseBooks">
        Add Supabase Books
      </AppButton>
      <AppButton v-if="isDev" @click="deleteAllBooks">
        Delete All Books
      </AppButton>
    </div>
    <div class="book-controls__filter">
      <fieldset class="filter-list">
        <legend class="sr-only">Filter by:</legend>
        <div class="filter-list__item filter-list__item--purchased">
          <input
            id="is_purchased"
            class="filter-list__checkbox"
            :checked="filterBy.includes('is_purchased')"
            type="checkbox"
            name="is_purchased"
            @change="setFilter"
          />
          <label class="filter-list__label" for="is_purchased">
            Purchased
          </label>
        </div>
        <div class="filter-list__item filter-list__item--prioritize">
          <input
            id="is_prioritized"
            class="filter-list__checkbox"
            :checked="filterBy.includes('is_prioritized')"
            type="checkbox"
            name="is_prioritized"
            @change="setFilter"
          />
          <label class="filter-list__label" for="is_prioritized">
            Prioritized
          </label>
        </div>
      </fieldset>
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
  </form>
</template>

<script setup>
import { sortOptions } from '../../utils/sort-options';
import {
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
  addSupabaseBooks,
} from '../../composables/useBookDev';
import AppButton from '../AppButton/AppButton.vue';

const isDev = import.meta.env.DEV;
</script>

<style lang="scss">
@import './BookControls';
</style>
