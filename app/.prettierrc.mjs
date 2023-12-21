/** @type {import("prettier").Options} */
export default {
  printWidth: 80,
  trailingComma: "all",
  semi: true,
  plugins: ["prettier-plugin-astro"],
  astroAllowShorthand: false,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
