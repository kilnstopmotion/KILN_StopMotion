// Loaded after app.js, before its DOMContentLoaded translation pass.
Object.assign(I18N.vi, {
  supportBar: 'Ủng hộ phát triển phần mềm:',
  donateTitle: 'Một ly cà phê.\nThêm nhiều khung hình.',
  donateLead: 'Cảm ơn bạn đã đồng hành cùng DA&D StopMotion — từ những khung hình đầu tiên đến những câu chuyện đang thành hình.',
  donateStoryTitle: 'Một chút chia sẻ từ KILN',
  donateStory: 'DA&D StopMotion bắt đầu từ mong muốn có một công cụ gần gũi với những người làm stop-motion. Đằng sau mỗi tính năng là thời gian thử nghiệm, sửa lỗi và lắng nghe trải nghiệm của bạn.',
  donatePurpose: 'Nếu phần mềm giúp công việc của bạn thuận tiện hơn, bạn có thể mời tụi mình một ly cà phê. Sự ủng hộ của bạn tiếp thêm động lực để KILN tiếp tục cải thiện phần mềm và chăm chút cho từng trải nghiệm nhỏ.',
  donateVoluntary: 'Ủng hộ hoàn toàn tự nguyện, với số tiền tùy bạn. Việc sử dụng phần mềm không yêu cầu đóng góp.',
  donateThanksTitle: 'Cảm ơn vì đã ở đây.',
  donateThanks: 'Dù là một ly cà phê, một góp ý hay một lần chia sẻ phần mềm với bạn bè, tất cả đều có ý nghĩa với tụi mình. Cảm ơn bạn đã giúp hành trình này tiếp tục, từng khung hình một.',
  donateTransfer: 'CHUYỂN KHOẢN NGÂN HÀNG', donatePayment: 'Thông tin ủng hộ', donateBank: 'Ngân hàng', donateOwner: 'Chủ tài khoản', donateAccount: 'Số tài khoản', donateCopy: 'Sao chép số tài khoản',
  donateCopied: 'Đã sao chép số tài khoản.', donateCopyError: 'Chưa sao chép được. Bạn có thể chọn và sao chép số tài khoản phía trên.',
  donateQrTitle: 'Quét mã QR để chuyển khoản', donateQrCopy: 'Mở ứng dụng ngân hàng và quét mã để ủng hộ KILN nhanh hơn.',
  donateCheck: 'Vui lòng kiểm tra tên người nhận và số tài khoản trong ứng dụng ngân hàng trước khi xác nhận.'
});
Object.assign(I18N.en, {
  supportBar: 'Support software development:', donateTitle: 'One cup of coffee.\nMany more frames.',
  donateLead: 'Thank you for being part of DA&D StopMotion — from the very first frames to the stories taking shape.',
  donateStoryTitle: 'A little note from KILN',
  donateStory: 'DA&D StopMotion began with a wish for an approachable tool for stop-motion creators. Behind each feature are hours of testing, fixing bugs and listening to your experiences.',
  donatePurpose: 'If the software makes your work easier, you can buy us a coffee. Your support encourages KILN to keep improving the software and caring for the little details.',
  donateVoluntary: 'Support is entirely optional, with any amount you choose. No contribution is required to use the software.',
  donateThanksTitle: 'Thank you for being here.',
  donateThanks: 'A coffee, a suggestion or sharing the software with a friend — it all means a lot to us. Thank you for helping this journey continue, one frame at a time.',
  donateTransfer: 'BANK TRANSFER', donatePayment: 'Support details', donateBank: 'Bank', donateOwner: 'Account holder', donateAccount: 'Account number', donateCopy: 'Copy account number',
  donateCopied: 'Account number copied.', donateCopyError: 'Could not copy. Please select and copy the account number above.',
  donateQrTitle: 'Scan the QR code to transfer', donateQrCopy: 'Open your banking app and scan the code to support KILN more quickly.',
  donateCheck: 'Please check the recipient name and account number in your banking app before confirming.'
});
document.addEventListener('DOMContentLoaded', () => {
  initSupportCelebration();
  const button = document.querySelector('.copy-account');
  if (!button) return;
  const status = document.querySelector('.copy-status');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector('.donate-account').textContent.trim());
      status.dataset.i18n = 'donateCopied';
    } catch (_) {
      status.dataset.i18n = 'donateCopyError';
    }
    status.textContent = translateSite(status.dataset.i18n);
  });
});

// Keep the real link usable without JavaScript and for modified/new-tab clicks.
function initSupportCelebration() {
  const links = document.querySelectorAll('a.support-cta');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let overlay = null;
  let navigationTimer = null;
  let activeLink = null;

  function resetCelebration() {
    window.clearTimeout(navigationTimer);
    navigationTimer = null;
    overlay?.remove();
    overlay = null;
    activeLink?.removeAttribute('aria-busy');
    activeLink = null;
  }

  links.forEach(link => link.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
    if (activeLink) { event.preventDefault(); return; }
    if (reducedMotion.matches || !Element.prototype.animate) return;
    event.preventDefault();
    activeLink = link;
    link.setAttribute('aria-busy', 'true');
    const destination = link.href;
    const navigate = () => { resetCelebration(); window.location.assign(destination); };
    // Navigation never depends on animation completion or third-party libraries.
    navigationTimer = window.setTimeout(navigate, 1000);

    try {
      overlay = document.createElement('div');
      overlay.className = 'support-celebration';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = '<div class="support-celebration-copy"><strong>THANK YOU!</strong><span>You keep KILN moving.</span></div>';
      document.body.appendChild(overlay);
      const colors = ['#ffcc66', '#ff69bf', '#a78bff', '#67dcff', '#71f0b6', '#ffffff'];
      const width = window.innerWidth;
      const height = window.innerHeight;
      for (let i = 0; i < 90; i++) {
        const piece = document.createElement('i');
        piece.className = 'support-confetti';
        piece.style.backgroundColor = colors[i % colors.length];
        overlay.appendChild(piece);
        const fromLeft = i % 2 === 0;
        const originX = width * (fromLeft ? .08 : .92);
        const endX = width * (fromLeft ? .1 + Math.random() * .85 : .05 + Math.random() * .85);
        const peakY = height * (Math.random() * .6 - .12);
        const spin = (Math.random() - .5) * 1000;
        piece.animate([
          { transform: `translate3d(${originX}px,${height * .9}px,0) rotate(0deg)`, opacity: 0 },
          { opacity: 1, offset: .08 },
          { transform: `translate3d(${endX}px,${peakY}px,0) rotate(${spin * .55}deg)`, opacity: 1, offset: .6 },
          { transform: `translate3d(${endX + (fromLeft ? 40 : -40)}px,${peakY + height * .25}px,0) rotate(${spin}deg)`, opacity: 0 }
        ], { duration: 920, delay: Math.random() * 60, easing: 'cubic-bezier(.15,.6,.35,1)', fill: 'both' });
      }
    } catch (_) {
      navigate();
    }
  }));
  // A restored history entry must not retain the overlay or a pending redirect.
  window.addEventListener('pagehide', resetCelebration);
  window.addEventListener('pageshow', resetCelebration);
}
