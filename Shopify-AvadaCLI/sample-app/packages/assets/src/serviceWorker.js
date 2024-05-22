/**
 * Register a service worker for cache everything and load an application faster.
 * It only works on production mode
 * @link https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
 */
export function register() {
  if (process.env.NODE_ENV !== 'production' || !'serviceWorker' in navigator) {
    return;
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
