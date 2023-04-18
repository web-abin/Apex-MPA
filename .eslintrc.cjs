module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',

    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json'
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: { '@': './src' }
      }
    }
  },
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-var-requires': 0 //解决报错：Require statement not part of import statement.
  },
  root: true
}
