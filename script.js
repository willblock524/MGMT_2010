(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = toggle?.querySelector('.theme-label');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const storageKey = 'will-block-theme';

  if (!toggle) return;

  const updateToggle = (theme) => {
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
    if (themeColor) themeColor.setAttribute('content', isDark ? '#151d1b' : '#f6f7f4');
  };

  updateToggle(root.dataset.theme || 'light');

  toggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    updateToggle(nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch (_) {
      // Theme still works for this visit if browser storage is unavailable.
    }
  });
})();
