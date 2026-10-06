Object.assign(I18N.vi,{"downloadNoteTitle": "Lưu ý khi tải và cài đặt", "downloadNoteIntro": "Một số máy có thể hiển thị “Windows protected your PC” hoặc cảnh báo từ phần mềm diệt virus. Cảnh báo chưa nhận diện ứng dụng không đồng nghĩa với phát hiện mã độc.", "downloadNoteStep1": "Chọn “More info”.", "downloadNoteStep2": "Chọn “Run anyway” nếu nút này xuất hiện để tiếp tục cài đặt.", "downloadNoteVirus": "Nếu như khi chạy File cài \"DAAD-StopMotion-5.0.0-Setup-x64\" và có cảnh báo Virus thì hãy tạm tắt phần mềm diệt virus hoặc Real-time protection của Windows để cài đặt. Bật lại bảo vệ ngay sau khi hoàn tất.", "downloadNoteSmartPrefix": "Nếu bạn tải bộ tài từ Website chính thức hoặc đảm bảo nguồn tải chính thống: Nếu có cảnh báo ", "downloadNoteSmartSuffix": " thì hãy làm theo cách sau:"});
Object.assign(I18N.en,{"downloadNoteTitle": "Download and installation note", "downloadNoteIntro": "Some PCs may show “Windows protected your PC” or an antivirus warning. An unrecognized-app warning is not the same as a malware detection.", "downloadNoteStep1": "Select “More info”.", "downloadNoteStep2": "Select “Run anyway”, if available, to continue installing.", "downloadNoteVirus": "If you see a virus warning when running the \"DAAD-StopMotion-5.0.0-Setup-x64\" installer, temporarily disable your antivirus or Windows Real-time protection to install. Turn protection back on immediately after installation.", "downloadNoteSmartPrefix": "If you downloaded the installer from the official website or have confirmed an official download source: If you see the warning ", "downloadNoteSmartSuffix": " follow these steps:"});
Object.assign(I18N.vi, {
  downloadOfficial:'Bản chính thức đầu tiên', downloadAction:'Tải phần mềm', downloadHistoryEmpty:'Chưa có phiên bản trước.'
});
Object.assign(I18N.en, {
  downloadOfficial:'First official release', downloadAction:'Download software', downloadHistoryEmpty:'No previous versions yet.'
});

document.addEventListener('DOMContentLoaded',()=>{
  const release=RELEASES[0];
  const button=document.querySelector('[data-download-primary]');
  const url=release?.installerUrl||release?.portableUrl||release?.betaUrl;
  if(url)button.href=url;
  if(release)document.querySelector('[data-download-version]').textContent=release.version;
  function renderHistory(){
    const list=document.querySelector('[data-download-history]');
    list.replaceChildren();
    const older=RELEASES.slice(1);
    if(!older.length){
      const empty=document.createElement('p');
      empty.textContent=translateSite('downloadHistoryEmpty');
      list.append(empty);
      return;
    }
    older.forEach(release=>{
      const row=document.createElement('article');
      row.className='download-history-row';
      const title=document.createElement('strong');
      title.textContent=release.version;
      row.append(title);
      const links=document.createElement('div');
      [[release.betaUrl,'betaDownload'],[release.installerUrl,'installer'],[release.portableUrl,'portable']].forEach(([url,key])=>{
        if(!url)return;
        const link=document.createElement('a');
        link.href=url;link.textContent=translateSite(key)+' ↗';
        links.append(link);
      });
      if(!links.children.length)links.textContent=translateSite('pendingBuild');
      row.append(links);list.append(row);
    });
  }
  const video=document.querySelector('.download-film');
  const backdrop=document.querySelector('.download-backdrop');
  const source=video.dataset.videoSrc.trim();
  let failed=false,loaded=false;
  function translate(){
    document.title=(lang==='en'?'Download':'Tải')+' DAAD StopMotion';
    renderHistory();
  }
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  translate();
  if(!source)return;
  function play(){
    if(!loaded){loaded=true;video.src=source;video.load();}
    video.muted=true;
    video.play().catch(translate);
  }
  function sync(){
    if(document.hidden||failed)video.pause();
    else play();
  }
  video.addEventListener('playing',()=>{backdrop.classList.add('has-video');translate();});
  video.addEventListener('pause',translate);
  video.addEventListener('error',()=>{failed=true;backdrop.classList.remove('has-video');});
  document.addEventListener('visibilitychange',sync);
  sync();
});
