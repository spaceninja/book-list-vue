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

## TODO

- [x] Rename `vuetils` to `composables` (search to confirm this is best practice)
- [x] Move `store.js` to `store/index.js`
- [x] Improve `useAuth` documentation
- [x] Update `useAuth` to not rely on alerts
- [x] Convert `Profile` to use `useProfile` composition
- [x] Convert `Avatar` to use `useProfile` composition
- [x] Improve `useProfile` documentation
- [x] Update `useProfile` to not rely on alerts
- [x] Convert authAlert to object {message,type}
- [x] Add GitHub actions for CI on PRs
- [x] Convert form elements to reusable components
- [x] Add testing library
- [x] Follow Todo example
- [x] Add a basic router to allow access to Profile
- [x] Move router links into AppHeader
- [x] Refactor `TodoItem`
- [x] Refactor `TodoList`
- [ ] Refactor `useTodo` with better docs and no alerts
- [ ] Add tests for existing components
      see: https://github.com/phanan/vue-3.0-simple-routing-example
