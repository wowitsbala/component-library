module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: [
    'react-refresh',
    '@typescript-eslint',
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'unused-imports'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  rules: {
    // Prettier formatting
    'prettier/prettier': 'error',


    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-default-export': 'off',


    // Best practices
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    'no-debugger': 'error',

    // Unused imports cleanup
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
    ],

    // Import order
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }
    ]
  }
}
