import globals from 'globals';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    ignores: ['dist/**/*'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2023,
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
  },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    languageOptions: {
      globals: globals.vitest,
    },
  },
  {
    // HACK: https://github.com/vuejs/eslint-plugin-vue/issues/1355
    files: ['**/*.html'],
    rules: { 'vue/comment-directive': 'off' },
  },
];
