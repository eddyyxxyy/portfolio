// eslint.config.ts
import js from "@eslint/js";
import eslintAstroPlugin from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";

export default [
  // Regras básicas do JavaScript
  js.configs.recommended,
  ...eslintAstroPlugin.configs.recommended,

  // All Files
  {
    plugins: {
      stylistic,
    },
    rules: {
      "stylistic/comma-dangle": ["error", "always-multiline"],
      "stylistic/quotes": ["error", "double"],
      "stylistic/semi": ["error"],
      "stylistic/max-len": ["error", { "code": 80, "ignoreStrings": true }],
    },
  },

   // TS files
   {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
  },

  {
    files: ["**/*.d.ts"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
