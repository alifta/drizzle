module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
  ],
  plugins: ['@typescript-eslint', 'node'],
  env: {
    node: true,
    es6: true,
    es2020: true,
  },
  rules: {
    'no-console': 'off', // Allow the use of console.log
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'], // Allows ES Modules syntax
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off', // Allow the use of the 'any' type
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return type on functions
    '@typescript-eslint/no-var-requires': 'off', // Allow the use of 'require' statements
  },
};
