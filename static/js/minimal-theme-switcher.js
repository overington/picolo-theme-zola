/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2024 - Licensed under MIT
 */

const themeSwitcher = {
  _scheme: "auto",

  toggleTarget: "[data-theme-toggle]",
  iconTarget: "[data-theme-icon]",
  rootAttribute: "data-theme",
  localStorageKey: "picoPreferredColorScheme",

  schemes: ["auto", "light", "dark"],

  init() {
    this._scheme = this.schemeFromLocalStorage;

    this.applyScheme();
    this.initSwitchers();
    this.updateSwitchers();
    this.initSystemPreferenceListener();
  },

  get schemeFromLocalStorage() {
    const storedScheme = window.localStorage?.getItem(this.localStorageKey);

    return this.schemes.includes(storedScheme)
      ? storedScheme
      : this._scheme;
  },

  get preferredColorScheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  },

  get effectiveScheme() {
    return this.scheme === "auto"
      ? this.preferredColorScheme
      : this.scheme;
  },

  get scheme() {
    return this._scheme;
  },

  set scheme(scheme) {
    if (!this.schemes.includes(scheme)) {
      return;
    }

    this._scheme = scheme;

    this.applyScheme();
    this.schemeToLocalStorage();
    this.updateSwitchers();
  },

  nextScheme(scheme = this.scheme) {
    const currentIndex = this.schemes.indexOf(scheme);

    return this.schemes[(currentIndex + 1) % this.schemes.length];
  },

  initSwitchers() {
    const buttons = document.querySelectorAll(this.toggleTarget);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.scheme = this.nextScheme();
      });
    });
  },

  updateSwitchers() {
    const buttons = document.querySelectorAll(this.toggleTarget);
    const nextScheme = this.nextScheme();

    const currentLabel =
      this.scheme.charAt(0).toUpperCase() + this.scheme.slice(1);

    const nextLabel =
      nextScheme.charAt(0).toUpperCase() + nextScheme.slice(1);

    buttons.forEach((button) => {
      button.querySelectorAll(this.iconTarget).forEach((icon) => {
        icon.hidden = icon.dataset.themeIcon !== this.scheme;
      });

      const label = `Color theme: ${currentLabel}. Switch to ${nextLabel}.`;

      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
  },

  applyScheme() {
    document
      .querySelector("html")
      ?.setAttribute(this.rootAttribute, this.effectiveScheme);
  },

  schemeToLocalStorage() {
    // Store "auto", rather than the resolved light/dark value.
    window.localStorage?.setItem(this.localStorageKey, this.scheme);
  },

  initSystemPreferenceListener() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateForSystemPreference = () => {
      if (this.scheme === "auto") {
        this.applyScheme();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateForSystemPreference);
    } else {
      // Compatibility with older browsers.
      mediaQuery.addListener(updateForSystemPreference);
    }
  },
};

themeSwitcher.init();
