
// PWA register
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(console.error);
  });
}
// Add to Home Screen helper (iOS shows via Share -> Add to Home Screen)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-route]');
  if(!t) return;
  const href = t.getAttribute('data-route');
  window.location.href = href;
});
