(() => {
  const storageKey = "portfolio-theme";
  let savedTheme;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch {
    savedTheme = null;
  }

  const preference =
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "system";
  const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  document.documentElement.dataset.theme =
    preference === "system" ? systemTheme : preference;
  document.documentElement.dataset.themePreference = preference;
})();
