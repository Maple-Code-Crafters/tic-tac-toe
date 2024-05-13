import eslintConfigPrettier from 'eslint-config-prettier';
import jestDom from 'eslint-plugin-jest-dom';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import hooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import eslint from '@eslint/js';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['ios/', 'android/', 'dist/', 'cypress.config.ts'],
  },
  {
    settings: { react: { version: 'detect' } },
    languageOptions: {
      globals: globals.browser,
    },
  },
  reactRecommended,
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  eslintConfigPrettier,
  jestDom.configs['flat/recommended'],
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // 1. `react` and packages starting with alphanumeric characters
            ['^react$', '^\\w'],
            // 2. vendor packages
            ['^@'],
            // 3. relative imports starting with "../"
            ['^\\.\\./?$'],
            // 4. relative imports from same folder "./"
            ['^\\./?$'],
            // 5. style imports
            ['^.+\\.(css|scss)$'],
            // 6. media imports
            ['^.+\\.(gif|png|svg|jpg)$'],
            // 7. side effect imports at the end
            ['^\\u0000'],
          ],
        },
      ],
    },
  },
);
