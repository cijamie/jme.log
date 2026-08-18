document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle logic ---
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      syncGiscusTheme(newTheme);
    });
  }

  // --- Reading Progress Bar logic ---
  const progressEl = document.getElementById('reading-progress');
  if (progressEl) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressEl.style.width = scrolled + '%';
    });
  }

  // --- Giscus Initial Sync ---
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://giscus.app') return;
    
    // Check if the event signals that giscus is loaded
    if (event.data && typeof event.data === 'object' && event.data.giscus) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      syncGiscusTheme(currentTheme);
    }
  });
});

/**
 * Sends a message to the Giscus iframe to sync its theme with the site theme.
 * @param {string} theme - 'light' or 'dark'
 */
function syncGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe || !iframe.contentWindow) return;
  
  const giscusTheme = theme === 'dark' ? 'dark' : 'light';
  
  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: giscusTheme
        }
      }
    },
    'https://giscus.app'
  );
}
