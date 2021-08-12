module.exports = {
  env: {
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  overrides: [
    {
      // HACK: https://github.com/vuejs/eslint-plugin-vue/issues/1355
      files: ['**/*.html'],
      rules: { 'vue/comment-directive': 'off' },
    },
  ],
};
