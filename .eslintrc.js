module.exports = {
  extends: [
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error"],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        ecmaVersion: "latest",
        extraFileExtensions: [".astro"],
        parser: "@typescript-eslint/parser",
      },
      processor: "astro/client-side-ts",
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
      },
      processor: "astro/client-side-ts",
    },
  ],
};
