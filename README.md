# Book List

> Create a sortable and filterable list of books you'd like to read.

This project is a Vue version of my old [book list](https://github.com/spaceninja/book-list) side project. I started that project to challenge my vanilla javascript skills, and this is recreating that functionality using Vue3, Vite, and Supabase.

## Project scripts

- `yarn` - install dependencies
- `yarn dev` - compiles and hot-reloads for development
- `yarn build` - compiles and minifies for production
- `yarn lint` - lints and fixes files
- `yarn test` - runs the test suite

## Dependencies

I was pretty impressed at how little was needed for the basic Vite+Vue app. Unfortunately, I had to add a lot more dependencies to support linting and testing. Here's a quick breakdown if you're wondering why anything's here:

- Base Vite + Vue 3 install
  - `@vitejs/plugin-vue`
  - `@vue/compiler-sfc`
  - `sass`
  - `vue`
  - `vite`
- Supabase integration (DB & Auth)
  - `@supabase/supabase-js`
- Better Sorting
  - `thenby`
- Linting
  - `eslint`
  - `eslint-config-prettier`
  - `eslint-plugin-jest`
  - `eslint-plugin-vue`
  - `prettier`
  - `stylelint`
  - `stylelint-config-prettier`
  - `stylelint-config-spaceninja`
- Testing
  - `@babel/core`
  - `@babel/plugin-transform-modules-commonjs`
  - `@babel/preset-env`
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
  - `@testing-library/vue`
  - `@types/jest`
  - `@vue/vue3-jest`
  - `babel-jest`
  - `jest`
