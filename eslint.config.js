import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import js from '@eslint/js';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks
    },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
);
