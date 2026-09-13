const SITE_CONFIG={coffeeEnabled:false};
const RELEASES=[
  {
    version:"5.0.0",
    date:null,
    stable:true,
    installerUrl:"",
    portableUrl:"",
    sizeInstaller:"",
    sizePortable:"",
    changes:{
      en:["First public DA&A StopMotion 5.x website release entry.","Download files will appear here after build packages are uploaded."],
      vi:["Mục phát hành đầu tiên cho DA&A StopMotion 5.x trên website.","File tải sẽ xuất hiện tại đây sau khi bộ cài được upload."]
    }
  }
];

const I18N={
  en:{
    navProduct:"Product",navDeveloper:"Developer",navDownload:"Download",
    heroEyebrow:"Developed by KILN",heroTitle:"DA&A StopMotion",heroLead:"A focused stop-motion production workspace built around the rhythm of frame-by-frame creation.",heroDownload:"Download v5.0.0",heroExplore:"Explore the product",heroMicro:"Windows · Installer & Portable · system requirements pending confirmation",
    preview:"APP PREVIEW",previewHint:"Drop your DA&A StopMotion screenshot here later",
    featTitle:"Built for the stop-motion workflow",featCopy:"A clean production flow from capture to review, without turning the interface into a wall of tools.",
    f1:"Capture",f1c:"Connect the camera and capture frames with a workflow designed for animation.",f2:"Animate",f2c:"Use motion guidance, onion-skin style references and frame-by-frame tools.",f3:"Review",f3c:"Inspect timing, playback and frame continuity while you work.",f4:"Organize",f4c:"Keep frames, takes and project structure easy to understand.",
    releaseEyebrow:"Releases",releaseTitle:"Download DA&A StopMotion",releaseCopy:"Get the current build or return to an older version whenever your production needs it.",latest:"LATEST",released:"Release date",pendingDate:"Pending",installer:"Installer",portable:"Portable",pendingBuild:"Build package not uploaded yet",releaseNotes:"Release notes",previous:"Previous releases",oldWarn:"Older releases remain available for compatibility. For most users, the latest stable version is recommended.",
    productHero:"Everything you need to bring frames to life.",productLead:"DA&A StopMotion is structured around the real sequence of stop-motion production — capture, animate, review, organize and export.",workflow:"Workflow",captureDesc:"Camera-first frame capture with production feedback close at hand.",animateDesc:"Timing and motion support for frame-by-frame decisions.",reviewDesc:"Review movement and continuity without leaving the project flow.",organizeDesc:"Keep shots and frames structured as projects grow.",exportDesc:"Move finished material cleanly into the next stage of post-production.",former:"Formerly KILN Motion",formerCopy:"The project began as KILN Motion and evolved into DA&A StopMotion as the workflow, scope and identity became more mature.",
    devHero:"Built by creators who needed the tool themselves.",devLead:"DA&A StopMotion is developed by KILN — a small creative development group focused on practical tools for frame-by-frame production.",behind:"Behind DA&A StopMotion",kilnCopy:"KILN is the development group behind DA&A StopMotion. The software grows from hands-on stop-motion, filmmaking and digital-art workflows rather than from a generic productivity template.",history:"Project history",creator:"Creator & Developer",creatorCopy:"Product direction, design and development for DA&A StopMotion.",philosophy:"Design philosophy",p1:"Simple",p1c:"Keep the important actions visible and remove noise.",p2:"Production-focused",p2c:"Prioritize decisions that matter during an actual shoot.",p3:"Frame-aware",p3c:"Design around the unique rhythm of frame-by-frame work.",
    coffeeTitle:"Support DA&A StopMotion",coffeeCopy:"If DA&A helps your work, you can support its continued development.",coffeeBtn:"Buy me a coffee",
    footer:"DA&A StopMotion · Developed by KILN",footerNote:"Formerly KILN Motion"
  },
  vi:{
    navProduct:"Sản phẩm",navDeveloper:"Nhà phát triển",navDownload:"Tải xuống",
    heroEyebrow:"Phát triển bởi KILN",heroTitle:"DA&A StopMotion",heroLead:"Không gian sản xuất stop-motion tập trung vào nhịp làm việc từng khung hình, gọn và rõ ràng.",heroDownload:"Tải DA&A v5.0.0",heroExplore:"Khám phá phần mềm",heroMicro:"Windows · Installer & Portable · yêu cầu hệ thống đang chờ xác nhận",
    preview:"XEM TRƯỚC GIAO DIỆN",previewHint:"Sau này chỉ cần thay bằng screenshot DA&A StopMotion",
    featTitle:"Thiết kế theo workflow stop-motion",featCopy:"Luồng làm việc sạch từ chụp đến review, không biến giao diện thành một bức tường chức năng.",
    f1:"Chụp",f1c:"Kết nối camera và chụp frame theo workflow dành riêng cho animation.",f2:"Animate",f2c:"Motion Guide, tham chiếu khung hình và các công cụ hỗ trợ chuyển động.",f3:"Review",f3c:"Kiểm tra timing, playback và độ liền mạch của chuyển động ngay khi làm.",f4:"Tổ chức",f4c:"Quản lý frame, take và project sao cho dễ hiểu khi dự án lớn dần.",
    releaseEyebrow:"Phiên bản",releaseTitle:"Tải DA&A StopMotion",releaseCopy:"Tải bản hiện tại hoặc quay lại phiên bản cũ khi production cần tương thích.",latest:"MỚI NHẤT",released:"Ngày phát hành",pendingDate:"Chưa cập nhật",installer:"Bộ cài",portable:"Bản Portable",pendingBuild:"Chưa upload file build",releaseNotes:"Ghi chú phiên bản",previous:"Các phiên bản trước",oldWarn:"Các phiên bản cũ vẫn được giữ để tương thích. Với đa số người dùng, nên dùng bản stable mới nhất.",
    productHero:"Mọi thứ cần thiết để biến từng frame thành chuyển động.",productLead:"DA&A StopMotion được xây theo đúng trình tự sản xuất stop-motion: chụp, animate, review, tổ chức và xuất.",workflow:"Quy trình",captureDesc:"Chụp frame ưu tiên camera, luôn giữ feedback production ở gần.",animateDesc:"Hỗ trợ timing và chuyển động cho những quyết định frame-by-frame.",reviewDesc:"Kiểm tra chuyển động và continuity mà không rời workflow.",organizeDesc:"Giữ shot và frame có cấu trúc khi project lớn dần.",exportDesc:"Đưa material hoàn thiện sang hậu kỳ một cách sạch sẽ.",former:"Tiền thân: KILN Motion",formerCopy:"Dự án bắt đầu với tên KILN Motion và phát triển thành DA&A StopMotion khi workflow, phạm vi và nhận diện trưởng thành hơn.",
    devHero:"Được làm bởi chính những người cần công cụ này.",devLead:"DA&A StopMotion được phát triển bởi KILN — một nhóm sáng tạo nhỏ tập trung vào công cụ thực tế cho sản xuất frame-by-frame.",behind:"Đằng sau DA&A StopMotion",kilnCopy:"KILN là nhóm phát triển đứng sau DA&A StopMotion. Phần mềm được xây từ trải nghiệm stop-motion, làm phim và mỹ thuật số thực tế thay vì từ một mẫu productivity chung chung.",history:"Lịch sử dự án",creator:"Creator & Developer",creatorCopy:"Định hướng sản phẩm, thiết kế và phát triển DA&A StopMotion.",philosophy:"Triết lý thiết kế",p1:"Đơn giản",p1c:"Giữ hành động quan trọng luôn dễ thấy và giảm nhiễu.",p2:"Tập trung production",p2c:"Ưu tiên những quyết định thật sự quan trọng trên set.",p3:"Hiểu từng frame",p3c:"Thiết kế theo nhịp đặc trưng của công việc frame-by-frame.",
    coffeeTitle:"Ủng hộ DA&A StopMotion",coffeeCopy:"Nếu DA&A hữu ích cho công việc của bạn, bạn có thể hỗ trợ dự án tiếp tục phát triển.",coffeeBtn:"Buy me a coffee",
    footer:"DA&A StopMotion · Phát triển bởi KILN",footerNote:"Tiền thân là KILN Motion"
  }
};

let lang=localStorage.getItem("daa-lang")||"en";
function t(key){return I18N[lang]?.[key]??key}
function applyI18n(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=t(el.dataset.i18n)});
  document.querySelectorAll("[data-lang]").forEach(btn=>btn.classList.toggle("active",btn.dataset.lang===lang));
  renderReleases();
}
function formatDate(date){
  if(!date)return t("pendingDate");
  return new Intl.DateTimeFormat(lang==="vi"?"vi-VN":"en-GB",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(date+"T00:00:00"));
}
function fileButton(label,url,extra=""){
  const disabled=!url;
  return `<a class="btn ${disabled?"btn-disabled":"btn-secondary"}" href="${url||"#"}" ${disabled?'aria-disabled="true" tabindex="-1"':''}>${label}${extra?` <span class="release-date">${extra}</span>`:""}</a>`;
}
function renderReleases(){
  const latestEl=document.querySelector("[data-release-latest]");
  const listEl=document.querySelector("[data-release-list]");
  if(!latestEl&&!listEl)return;
  const [latest,...older]=RELEASES;
  if(latestEl&&latest){
    latestEl.innerHTML=`<div><div class="release-title"><h3>DA&amp;A StopMotion ${latest.version}</h3><span class="badge">${t("latest")}</span></div><div class="release-meta">${t("released")}: ${formatDate(latest.date)}</div><p class="release-note">${latest.changes[lang].join(" · ")}</p>${(!latest.installerUrl&&!latest.portableUrl)?`<div class="notice">${t("pendingBuild")}</div>`:""}</div><div class="download-actions">${fileButton(t("installer"),latest.installerUrl,latest.sizeInstaller)}${fileButton(t("portable"),latest.portableUrl,latest.sizePortable)}</div>`;
  }
  if(listEl){
    listEl.innerHTML=older.length?older.map((r,i)=>`<div class="release-item"><button class="release-trigger" aria-expanded="false"><strong class="release-version">${r.version}</strong><span class="release-date">${formatDate(r.date)}</span><span class="release-plus">+</span></button><div class="release-details"><p>${r.changes[lang].join(" · ")}</p><div class="download-actions" style="justify-content:flex-start">${fileButton(t("installer"),r.installerUrl,r.sizeInstaller)}${fileButton(t("portable"),r.portableUrl,r.sizePortable)}</div></div></div>`).join(""):`<div class="notice">${lang==="vi"?"Chưa có phiên bản cũ được thêm vào.":"No previous releases have been added yet."}</div>`;
    listEl.querySelectorAll(".release-trigger").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".release-item");item.classList.toggle("open");btn.setAttribute("aria-expanded",item.classList.contains("open"));}));
  }
}
function init(){
  document.querySelectorAll("[data-lang]").forEach(btn=>btn.addEventListener("click",()=>{lang=btn.dataset.lang;localStorage.setItem("daa-lang",lang);applyI18n();}));
  document.querySelectorAll("[data-download-scroll]").forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector("#download");if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"});}}));
  if(SITE_CONFIG.coffeeEnabled)document.querySelectorAll(".coffee").forEach(el=>el.style.display="block");
  applyI18n();
}
document.addEventListener("DOMContentLoaded",init);
