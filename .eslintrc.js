module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'eol-last': 0,
    'no-useless-return': 0,
    'no-case-declarations': 0,
    indent: 0,
    quotes: 0,
    semi: 0,
    'multiline-ternary': 0,
    'space-before-function-paren': 0,
    'no-trailing-spaces': 0
  }
}
