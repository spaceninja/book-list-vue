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

## TODO

- [x] Rename `vuetils` to `composables` (search to confirm this is best practice)
- [x] Move `store.js` to `store/index.js`
- [x] Improve `useAuth` documentation
- [x] Update `useAuth` to not rely on alerts
- [x] Convert `Profile` to use `useProfile` composition
- [ ] Convert `Avatar` to use `useProfile` composition
- [ ] Improve `useProfile` documentation
- [ ] Update `useProfile` to not rely on alerts
- [ ] Convert authAlert to global alert using store object {message,type}
- [ ] Follow Todo example
  - https://github.com/supabase/supabase/tree/master/examples/vue3-ts-todo-list
- [ ] Add GitHub actions for CI on PRs
- [ ] Add tests
