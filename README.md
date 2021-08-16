# Book List Vue

Bootstrapped with Vite & Vue 3.

## Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Run tests

```
yarn test
```

## Dependencies

I was pretty impressed at how little was needed for the basic Vite+Vue app.
Unfortunately, I had to add a lot more dependencies to support linting and
testing. Here's a quick breakdown if you're wondering why anything's here:

- Base Vite + Vue 3 install
  - `@vitejs/plugin-vue`
  - `@vue/compiler-sfc`
  - `sass`
  - `vue`
  - `vite`
- Supabase integration (DB & Auth)
  - `@supabase/supabase-js`
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
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
  - `@testing-library/vue`
  - `@types/jest`
  - `babel-jest`
  - `jest`
  - `vue-jest`
