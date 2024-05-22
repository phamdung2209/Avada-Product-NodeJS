export default function popupCenter({
  url,
  target = '_blank',
  w,
  h,
  setVerifying = () => {},
  closeModal = () => {},
  reFetch = () => {}
}) {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    target,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
  );

  console.log('window open');

  const timer = setInterval(() => {
    if (newWindow.closed) {
      console.log('window close');
      closeModal();
      reFetch();
      clearInterval(timer);
      setVerifying(false);
      if (checkItv) {
        clearTimeout(checkItv);
      }
    }
  }, 500);

  const checkItv = setTimeout(() => {
    if (timer) {
      clearInterval(timer);
      setVerifying(false);
    }
  }, 60000);

  if (window.focus) newWindow.focus();
}
