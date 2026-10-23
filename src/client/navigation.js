const storageKey = "portfolio-theme";
const menu = document.getElementById("mobile-menu");
const themeSelects = document.querySelectorAll(".theme-select");
const systemPreference = matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (preference) => {
  const theme =
    preference === "system"
      ? systemPreference.matches
        ? "dark"
        : "light"
      : preference;

  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
};

for (const themeSelect of themeSelects) {
  if (!(themeSelect instanceof HTMLSelectElement)) continue;
  themeSelect.value =
    document.documentElement.dataset.themePreference ?? "system";
  themeSelect.addEventListener("change", () => {
    try {
      localStorage.setItem(storageKey, themeSelect.value);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
    applyTheme(themeSelect.value);
    for (const otherSelect of themeSelects) {
      if (otherSelect instanceof HTMLSelectElement) {
        otherSelect.value = themeSelect.value;
      }
    }
  });
}

systemPreference.addEventListener("change", () => {
  if (document.documentElement.dataset.themePreference === "system") {
    applyTheme("system");
  }
});

menu?.addEventListener("click", (event) => {
  if (
    event.target instanceof HTMLAnchorElement &&
    "hidePopover" in menu
  ) {
    menu.hidePopover();
  }
});
