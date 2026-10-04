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
  donateQrTitle: 'Mã QR sẽ được bổ sung', donateQrCopy: 'Bạn có thể chuyển khoản bằng thông tin tài khoản phía trên.',
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
  donateQrTitle: 'QR code coming soon', donateQrCopy: 'You can transfer using the account details above.',
  donateCheck: 'Please check the recipient name and account number in your banking app before confirming.'
});
document.addEventListener('DOMContentLoaded', () => {
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
