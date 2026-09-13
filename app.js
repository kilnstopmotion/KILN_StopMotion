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
      en:["First public DA&A StopMotion 5.x release entry.","Installer and portable files will appear here after the builds are uploaded."],
      vi:["Mục phát hành đầu tiên của DA&A StopMotion 5.x.","Bộ cài và bản portable sẽ xuất hiện tại đây sau khi file build được tải lên."]
    }
  }
];

const I18N={
  en:{
    navProduct:"Product",navDeveloper:"Developer",navDownload:"Download",
    heroEyebrow:"Developed by KILN",heroLead:"Stop-motion production software shaped around every frame, every take and the small decisions that make movement feel alive.",heroDownload:"Download DA&A v5.0.0",heroExplore:"Explore the product",heroMicro:"Windows · Installer & Portable · system requirements pending confirmation",heroNote:"Small things move big stories.",
    preview:"APP SCREENSHOT",previewHint:"Your DA&A StopMotion screenshot will live here",frameCaption:"A frame-by-frame production workspace",
    featKicker:"From small frames to bigger stories",featTitle:"Everything you need for stop-motion.",featCopy:"Capture, animate, review and organize without losing the rhythm of the shot.",
    f1:"Capture",f1c:"Connect your camera and capture frames with deliberate, production-friendly control.",f2:"Animate",f2c:"Shape timing and motion with tools built for frame-by-frame decisions.",f3:"Review",f3c:"Replay, compare and inspect movement while the shot is still in your hands.",f4:"Organize",f4c:"Keep frames, takes and project structure clear as a production grows.",
    releaseEyebrow:"Latest release",releaseTitle:"Download DA&A StopMotion",releaseCopy:"Choose the installer or portable build. Older versions stay available when compatibility matters.",latest:"LATEST",released:"Release date",pendingDate:"Pending",installer:"Installer",portable:"Portable",pendingBuild:"Build files have not been uploaded yet.",previous:"Previous releases",oldWarn:"Older releases stay available for compatibility. For most users, the latest stable version is recommended.",emptyArchive:"The archive is ready",emptyArchiveCopy:"Previous DA&A releases will appear here as soon as they are added.",
    productHero:"A frame-by-frame workflow, without the clutter.",productLead:"DA&A StopMotion follows the real sequence of stop-motion production — capture, animate, review, organize and export.",workflow:"Workflow",captureDesc:"Camera-first frame capture with production feedback close at hand.",animateDesc:"Timing and motion support for frame-by-frame decisions.",reviewDesc:"Review movement and continuity without leaving the project flow.",organizeDesc:"Keep shots and frames structured as projects grow.",exportDesc:"Move finished material cleanly into the next stage of post-production.",former:"Formerly KILN Motion",formerCopy:"The project began as KILN Motion and evolved into DA&A StopMotion as the workflow, scope and identity became more mature.",
    devHero:"Built by people who needed the tool themselves.",devLead:"DA&A StopMotion is developed by KILN — a small creative group focused on practical tools for frame-by-frame production.",behind:"Behind DA&A StopMotion",kilnCopy:"KILN is the development group behind DA&A StopMotion. The software grows from hands-on stop-motion, filmmaking and digital-art workflows rather than a generic productivity template.",history:"Project history",creator:"Creator & Developer",creatorCopy:"Product direction, design and development for DA&A StopMotion.",philosophy:"Design philosophy",p1:"Simple",p1c:"Keep important actions visible and remove noise.",p2:"Production-focused",p2c:"Prioritize decisions that matter during an actual shoot.",p3:"Frame-aware",p3c:"Design around the unique rhythm of frame-by-frame work.",
    coffeeTitle:"Support DA&A StopMotion",coffeeCopy:"If DA&A helps your work, you can support its continued development.",coffeeBtn:"Buy me a coffee",
    footer:"DA&A StopMotion · Developed by KILN",footerNote:"Formerly KILN Motion",footerTagline:"Make every frame count."
  },
  vi:{
    navProduct:"Sản phẩm",navDeveloper:"Nhà phát triển",navDownload:"Tải xuống",
    heroEyebrow:"Phát triển bởi KILN",heroLead:"Công cụ sản xuất stop-motion được xây quanh từng khung hình, từng take và những quyết định nhỏ khiến chuyển động trở nên có hồn.",heroDownload:"Tải DA&A v5.0.0",heroExplore:"Khám phá phần mềm",heroMicro:"Windows · Installer & Portable · yêu cầu hệ thống đang chờ xác nhận",heroNote:"Những điều nhỏ tạo nên câu chuyện lớn.",
    preview:"ẢNH GIAO DIỆN ỨNG DỤNG",previewHint:"Sau này chỉ cần thay bằng screenshot DA&A StopMotion",frameCaption:"Không gian sản xuất frame-by-frame",
    featKicker:"Từ những khung hình nhỏ đến những câu chuyện lớn",featTitle:"Mọi thứ bạn cần cho stop-motion.",featCopy:"Chụp, animate, review và tổ chức mà không làm đứt nhịp của cảnh quay.",
    f1:"Chụp",f1c:"Kết nối camera và chụp frame với cách điều khiển rõ ràng, phù hợp production.",f2:"Animate",f2c:"Tinh chỉnh timing và chuyển động bằng những công cụ dành cho quyết định frame-by-frame.",f3:"Review",f3c:"Phát lại, so sánh và kiểm tra chuyển động ngay khi cảnh quay vẫn đang được thực hiện.",f4:"Tổ chức",f4c:"Giữ frame, take và cấu trúc project rõ ràng khi production lớn dần.",
    releaseEyebrow:"Bản phát hành mới nhất",releaseTitle:"Tải DA&A StopMotion",releaseCopy:"Chọn bộ cài hoặc bản portable. Các phiên bản cũ vẫn được giữ lại khi cần tương thích.",latest:"MỚI NHẤT",released:"Ngày phát hành",pendingDate:"Chưa cập nhật",installer:"Bộ cài",portable:"Bản Portable",pendingBuild:"File build chưa được tải lên.",previous:"Các phiên bản trước",oldWarn:"Các bản cũ vẫn được giữ để tương thích. Với đa số người dùng, nên dùng bản stable mới nhất.",emptyArchive:"Kho phiên bản đã sẵn sàng",emptyArchiveCopy:"Các bản DA&A cũ sẽ xuất hiện tại đây ngay khi được thêm vào.",
    productHero:"Workflow từng khung hình, nhưng không rối mắt.",productLead:"DA&A StopMotion được xây theo đúng trình tự sản xuất stop-motion: chụp, animate, review, tổ chức và xuất.",workflow:"Quy trình",captureDesc:"Chụp frame ưu tiên camera, luôn giữ feedback production ở gần.",animateDesc:"Hỗ trợ timing và chuyển động cho những quyết định frame-by-frame.",reviewDesc:"Kiểm tra chuyển động và continuity mà không rời workflow.",organizeDesc:"Giữ shot và frame có cấu trúc khi project lớn dần.",exportDesc:"Đưa material hoàn thiện sang hậu kỳ một cách sạch sẽ.",former:"Tiền thân: KILN Motion",formerCopy:"Dự án bắt đầu với tên KILN Motion và phát triển thành DA&A StopMotion khi workflow, phạm vi và nhận diện trưởng thành hơn.",
    devHero:"Được làm bởi chính những người cần công cụ này.",devLead:"DA&A StopMotion được phát triển bởi KILN — một nhóm sáng tạo nhỏ tập trung vào những công cụ thực tế cho sản xuất frame-by-frame.",behind:"Đằng sau DA&A StopMotion",kilnCopy:"KILN là nhóm phát triển đứng sau DA&A StopMotion. Phần mềm được xây từ trải nghiệm stop-motion, làm phim và mỹ thuật số thực tế thay vì từ một mẫu productivity chung chung.",history:"Lịch sử dự án",creator:"Creator & Developer",creatorCopy:"Định hướng sản phẩm, thiết kế và phát triển DA&A StopMotion.",philosophy:"Triết lý thiết kế",p1:"Đơn giản",p1c:"Giữ hành động quan trọng luôn dễ thấy và giảm nhiễu.",p2:"Tập trung production",p2c:"Ưu tiên những quyết định thật sự quan trọng trên set.",p3:"Hiểu từng frame",p3c:"Thiết kế theo nhịp đặc trưng của công việc frame-by-frame.",
    coffeeTitle:"Ủng hộ DA&A StopMotion",coffeeCopy:"Nếu DA&A hữu ích cho công việc của bạn, bạn có thể hỗ trợ dự án tiếp tục phát triển.",coffeeBtn:"Buy me a coffee",
    footer:"DA&A StopMotion · Phát triển bởi KILN",footerNote:"Tiền thân là KILN Motion",footerTagline:"Mỗi khung hình đều có ý nghĩa."
  }
};

let lang=localStorage.getItem("daa-lang")||"vi";
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
  return `<a class="btn ${disabled?"btn-disabled":"btn-secondary"}" href="${url||"#"}" ${disabled?'aria-disabled="true" tabindex="-1"':''}><span>${label}</span><span class="arrow">→</span>${extra?`<span class="release-date">${extra}</span>`:""}</a>`;
}
function renderReleases(){
  const latestEl=document.querySelector("[data-release-latest]");
  const listEl=document.querySelector("[data-release-list]");
  if(!latestEl&&!listEl)return;
  const [latest,...older]=RELEASES;
  if(latestEl&&latest){
    latestEl.innerHTML=`<div><div class="release-title"><h3>DA&amp;A StopMotion ${latest.version}</h3><span class="badge">${t("latest")}</span></div><div class="release-meta">${t("released")}: ${formatDate(latest.date)}</div><p class="release-note">${latest.changes[lang].join(" · ")}</p>${(!latest.installerUrl&&!latest.portableUrl)?`<div class="notice">ⓘ ${t("pendingBuild")}</div>`:""}</div><div class="download-actions">${fileButton(t("installer"),latest.installerUrl,latest.sizeInstaller)}${fileButton(t("portable"),latest.portableUrl,latest.sizePortable)}</div>`;
  }
  if(listEl){
    if(older.length){
      listEl.innerHTML=older.map(r=>`<div class="release-item"><button class="release-trigger" aria-expanded="false"><div><strong class="release-version">v${r.version}</strong><div class="release-date">${formatDate(r.date)}</div></div><span class="release-plus">+</span></button><div class="release-details"><p>${r.changes[lang].join(" · ")}</p><div class="download-actions">${fileButton(t("installer"),r.installerUrl,r.sizeInstaller)}${fileButton(t("portable"),r.portableUrl,r.sizePortable)}</div></div></div>`).join("");
      listEl.querySelectorAll(".release-trigger").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".release-item");item.classList.toggle("open");btn.setAttribute("aria-expanded",item.classList.contains("open"));}));
    }else{
      listEl.innerHTML=`<div class="release-empty"><div><strong>${t("emptyArchive")}</strong><div class="release-date">${t("emptyArchiveCopy")}</div></div><span class="section-kicker">FRAME ARCHIVE / 000</span></div>`;
    }
  }
}
function initReveal(){
  const items=[...document.querySelectorAll(".reveal")];
  if(!items.length)return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(el=>el.classList.add("is-visible"));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");io.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -30px"});
  items.forEach(el=>io.observe(el));
}
function initPointerInteractions(){
  if(window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches)return;
  document.querySelectorAll("[data-tilt]").forEach(el=>{
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(1000px) rotateX(${-y*2.2}deg) rotateY(${x*2.2}deg) translateY(-2px)`;
      el.querySelectorAll("[data-parallax]").forEach(layer=>{const depth=Number(layer.dataset.parallax||1);layer.style.transform=`translate3d(${x*depth*6}px,${y*depth*6}px,0)`});
    });
    el.addEventListener("pointerleave",()=>{el.style.transform="";el.querySelectorAll("[data-parallax]").forEach(layer=>layer.style.transform="")});
  });
  document.querySelectorAll(".hover-shift").forEach(el=>{
    el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/r.width;const y=(e.clientY-r.top-r.height/2)/r.height;el.style.transform=`translate(${x*5}px,${y*5}px)`});
    el.addEventListener("pointerleave",()=>el.style.transform="");
  });
}
function init(){
  document.querySelectorAll("[data-lang]").forEach(btn=>btn.addEventListener("click",()=>{lang=btn.dataset.lang;localStorage.setItem("daa-lang",lang);applyI18n();}));
  document.querySelectorAll("[data-download-scroll]").forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector("#download");if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"});}}));
  if(SITE_CONFIG.coffeeEnabled)document.querySelectorAll(".coffee").forEach(el=>{el.style.display="block";el.removeAttribute("aria-hidden")});
  applyI18n();initReveal();initPointerInteractions();
}
document.addEventListener("DOMContentLoaded",init);
