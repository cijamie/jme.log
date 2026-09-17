document.addEventListener('DOMContentLoaded', () => {
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

  // --- Giscus Light Theme Verification ---
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://giscus.app') return;
    
    // Ensure Giscus loads in light mode
    if (event.data && typeof event.data === 'object' && event.data.giscus) {
      const iframe = document.querySelector('iframe.giscus-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            giscus: {
              setConfig: {
                theme: 'light'
              }
            }
          },
          'https://giscus.app'
        );
      }
    }
  });
});
