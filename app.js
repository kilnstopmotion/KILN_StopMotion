const SITE_CONFIG={coffeeEnabled:false};
const RELEASES=[{
  version:"5.0.0 Beta",date:null,stable:false,betaUrl:"https://drive.google.com/file/d/1a2uXqy9tUNHMU8vs43ntoC1_K6--DXf7/view?usp=sharing",installerUrl:"",portableUrl:"",sizeInstaller:"",sizePortable:"",
  changes:{
    en:["DA&D StopMotion 5.0.0 Beta.","The Beta build is available on Google Drive."],
    vi:["DA&D StopMotion 5.0.0 Beta.","Bản Beta đã có trên Google Drive."]
  }
}];

const I18N={
  en:{
    navProduct:"Software",navFeatured:"Featured work",navDeveloper:"Developer",navDownload:"Download",
    heroEyebrow:"Developed by KILN",heroLead:"Software that helps you capture, preview and manage every frame with ease and intuitive control.",heroDownload:"Download DA&D Beta",heroExplore:"Explore the product",heroMicro:"Windows · Beta · system requirements pending confirmation",heroNote:"Small things move big stories.",
    preview:"APP SCREENSHOT",previewHint:"Your DA&D StopMotion screenshot will live here",frameCaption:"A frame-by-frame production workspace",
    featKicker:"From small frames to bigger stories",featTitle:"Everything you need for stop-motion.",featCopy:"Capture, animate, review and organize without losing the rhythm of the shot.",
    f1:"Capture",f1c:"Connect your camera and capture frames with deliberate, production-friendly control.",f2:"Animate",f2c:"Shape timing and motion with tools built for frame-by-frame decisions.",f3:"Review",f3c:"Replay, compare and inspect movement while the shot is still in your hands.",f4:"Organize",f4c:"Keep frames, takes and project structure clear as a production grows.",
    releaseEyebrow:"Latest release",releaseTitle:"Download DA&D StopMotion Beta",betaDownload:"Download Beta",releaseCopy:"Download the Beta build from Google Drive and try DA&D StopMotion.",latest:"LATEST",released:"Release date",pendingDate:"Pending",installer:"Installer",portable:"Portable",pendingBuild:"Build files have not been uploaded yet.",previous:"Previous releases",oldWarn:"Older releases stay available for compatibility. The current release is a Beta build.",emptyArchive:"The archive is ready",emptyArchiveCopy:"Previous DA&D releases will appear here as soon as they are added.",
    productHero:"A frame-by-frame workflow, without the clutter.",productLead:"DA&D StopMotion follows the real sequence of stop-motion production — capture, animate, review, organize and export.",workflow:"Workflow",captureDesc:"Camera-first frame capture with production feedback close at hand.",animateDesc:"Timing and motion support for frame-by-frame decisions.",reviewDesc:"Review movement and continuity without leaving the project flow.",organizeDesc:"Keep shots and frames structured as projects grow.",exportDesc:"Move finished material cleanly into the next stage of post-production.",former:"Formerly KILN Motion",formerCopy:"The project began as KILN Motion and evolved into DA&D StopMotion as the workflow, scope and identity became more mature.",
    devHero:"Built by people who needed the tool themselves.",devLead:"DA&D StopMotion is developed by KILN — a small creative group focused on practical tools for frame-by-frame production.",behind:"Behind DA&D StopMotion",kilnCopy:"KILN is a furnace — where earth meets fire, where raw materials are fired and transformed into a work of art. And so are we: five different people, each with a distinct color, yet sharing the same fiercely burning passion.",history:"Project history",creator:"Creator & Developer",creatorCopy:"Product direction, design and development for DA&D StopMotion.",philosophy:"Design philosophy",p1:"Simple",p1c:"Keep important actions visible and remove noise.",p2:"Production-focused",p2c:"Prioritize decisions that matter during an actual shoot.",p3:"Frame-aware",p3c:"Design around the unique rhythm of frame-by-frame work.",
    typeLine1:"Good motion does not begin with playback.",typeLine2:"It begins with one frame.",typeLine3:"Then one more frame.",
    coffeeTitle:"Support DA&D StopMotion",coffeeCopy:"If DA&D helps your work, you can support its continued development.",coffeeBtn:"Buy me a coffee",footerNote:"Formerly KILN Motion",footerTagline:"Make every frame count."
  },
  vi:{
    navProduct:"Phần mềm",navFeatured:"Tác phẩm tiêu biểu",navDeveloper:"Nhà phát triển",navDownload:"Tải xuống",
    heroEyebrow:"Phát triển bởi KILN",heroLead:"Phần mềm giúp bạn chụp, xem trước và quản lý từng khung hình một cách dễ dàng và trực quan nhất.",heroDownload:"Tải DA&D bản Beta",heroExplore:"Khám phá phần mềm",heroMicro:"Windows · Beta · yêu cầu hệ thống đang chờ xác nhận",heroNote:"Những điều nhỏ tạo nên câu chuyện lớn.",
    preview:"ẢNH GIAO DIỆN ỨNG DỤNG",previewHint:"Sau này chỉ cần thay bằng screenshot DA&D StopMotion",frameCaption:"Không gian sản xuất frame-by-frame",
    featKicker:"Từ những khung hình nhỏ đến những câu chuyện lớn",featTitle:"Mọi thứ bạn cần cho stop-motion.",featCopy:"Chụp, animate, review và tổ chức mà không làm đứt nhịp của cảnh quay.",
    f1:"Chụp",f1c:"Kết nối camera và chụp frame với cách điều khiển rõ ràng, phù hợp production.",f2:"Animate",f2c:"Tinh chỉnh timing và chuyển động bằng những công cụ dành cho quyết định frame-by-frame.",f3:"Review",f3c:"Phát lại, so sánh và kiểm tra chuyển động ngay khi cảnh quay vẫn đang được thực hiện.",f4:"Tổ chức",f4c:"Giữ frame, take và cấu trúc project rõ ràng khi production lớn dần.",
    releaseEyebrow:"Bản phát hành mới nhất",releaseTitle:"Tải DA&D StopMotion bản Beta",betaDownload:"Tải bản Beta",releaseCopy:"Tải bản Beta từ Google Drive để trải nghiệm DA&D StopMotion.",latest:"MỚI NHẤT",released:"Ngày phát hành",pendingDate:"Chưa cập nhật",installer:"Bộ cài",portable:"Bản Portable",pendingBuild:"File build chưa được tải lên.",previous:"Các phiên bản trước",oldWarn:"Các bản cũ vẫn được giữ để tương thích. Phiên bản hiện tại là bản Beta.",emptyArchive:"Kho phiên bản đã sẵn sàng",emptyArchiveCopy:"Các bản DA&D cũ sẽ xuất hiện tại đây ngay khi được thêm vào.",
    productHero:"Workflow từng khung hình, nhưng không rối mắt.",productLead:"DA&D StopMotion được xây theo đúng trình tự sản xuất stop-motion: chụp, animate, review, tổ chức và xuất.",workflow:"Quy trình",captureDesc:"Chụp frame ưu tiên camera, luôn giữ feedback production ở gần.",animateDesc:"Hỗ trợ timing và chuyển động cho những quyết định frame-by-frame.",reviewDesc:"Kiểm tra chuyển động và continuity mà không rời workflow.",organizeDesc:"Giữ shot và frame có cấu trúc khi project lớn dần.",exportDesc:"Đưa material hoàn thiện sang hậu kỳ một cách sạch sẽ.",former:"Tiền thân: KILN Motion",formerCopy:"Dự án bắt đầu với tên KILN Motion và phát triển thành DA&D StopMotion khi workflow, phạm vi và nhận diện trưởng thành hơn.",
    devHero:"Được làm bởi chính những người cần công cụ này.",devLead:"DA&D StopMotion được phát triển bởi KILN — một nhóm sáng tạo nhỏ tập trung vào những công cụ thực tế cho sản xuất frame-by-frame.",behind:"Đằng sau DA&D StopMotion",kilnCopy:"KILN là lò nung – nơi đất gặp lửa, nơi những điều thô mộc được nung nấu để trở thành một tác phẩm. Và tụi tui cũng vậy, 5 con người khác nhau, mỗi người mang một màu sắc riêng nhưng lại có cùng một ngọn lửa đam mê nồng cháy.",history:"Lịch sử dự án",creator:"Creator & Developer",creatorCopy:"Định hướng sản phẩm, thiết kế và phát triển DA&D StopMotion.",philosophy:"Triết lý thiết kế",p1:"Đơn giản",p1c:"Giữ hành động quan trọng luôn dễ thấy và giảm nhiễu.",p2:"Tập trung production",p2c:"Ưu tiên những quyết định thật sự quan trọng trên set.",p3:"Hiểu từng frame",p3c:"Thiết kế theo nhịp đặc trưng của công việc frame-by-frame.",
    typeLine1:"Một chuyển động tốt không bắt đầu từ playback.",typeLine2:"Nó bắt đầu từ một frame.",typeLine3:"Rồi thêm một frame nữa.",
    coffeeTitle:"Ủng hộ DA&D StopMotion",coffeeCopy:"Nếu DA&D hữu ích cho công việc của bạn, bạn có thể hỗ trợ dự án tiếp tục phát triển.",coffeeBtn:"Buy me a coffee",footerNote:"Tiền thân là KILN Motion",footerTagline:"Mỗi khung hình đều có ý nghĩa."
  }
};

let lang=localStorage.getItem("daa-lang")||"vi";
let typewriterRefresh=()=>{};
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer=window.matchMedia("(hover:hover) and (pointer:fine)");
function translateSite(key){return I18N[lang]?.[key]??key}

function applyI18n(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=translateSite(el.dataset.i18n)});
  document.querySelectorAll("[data-lang]").forEach(btn=>btn.classList.toggle("active",btn.dataset.lang===lang));
  document.querySelectorAll("[data-type-key]").forEach(el=>el.dataset.fullText=translateSite(el.dataset.typeKey));
  renderReleases();
  typewriterRefresh();
}

function formatDate(date){
  if(!date)return translateSite("pendingDate");
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
    latestEl.innerHTML=`<div><div class="release-title"><h3>DA&amp;D StopMotion ${latest.version}</h3><span class="badge">${latest.stable?translateSite("latest"):"BETA"}</span></div><div class="release-meta"><span>VERSION / ${latest.version}</span><span> · </span><span>${translateSite("released")}: ${formatDate(latest.date)}</span></div><p class="release-note">${latest.changes[lang].join(" · ")}</p>${(!latest.betaUrl&&!latest.installerUrl&&!latest.portableUrl)?`<div class="notice">ⓘ ${translateSite("pendingBuild")}</div>`:""}</div><div class="download-actions">${latest.betaUrl?fileButton(translateSite("betaDownload"),latest.betaUrl):`${fileButton(translateSite("installer"),latest.installerUrl,latest.sizeInstaller)}${fileButton(translateSite("portable"),latest.portableUrl,latest.sizePortable)}`}</div>`;
  }
  if(listEl){
    if(older.length){
      listEl.innerHTML=older.map(r=>`<div class="release-item"><button class="release-trigger" aria-expanded="false"><div><strong class="release-version">v${r.version}</strong><div class="release-date">${formatDate(r.date)}</div></div><span class="release-plus">+</span></button><div class="release-details"><p>${r.changes[lang].join(" · ")}</p><div class="download-actions">${fileButton(translateSite("installer"),r.installerUrl,r.sizeInstaller)}${fileButton(translateSite("portable"),r.portableUrl,r.sizePortable)}</div></div></div>`).join("");
      listEl.querySelectorAll(".release-trigger").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".release-item");item.classList.toggle("open");btn.setAttribute("aria-expanded",item.classList.contains("open"));}));
    }else{
      listEl.innerHTML=`<div class="release-empty"><div><strong>${translateSite("emptyArchive")}</strong><div class="release-date">${translateSite("emptyArchiveCopy")}</div></div><span class="section-kicker">FRAME ARCHIVE / 000</span></div>`;
    }
  }
}

function syncFeaturedMainNav(){
  const nav=document.querySelector(".site-header .nav-links");
  if(!nav)return;
  const featured=nav.querySelector("[data-featured-main-nav]");
  const product=nav.querySelector('[data-i18n="navProduct"]');
  const page=document.body?.dataset.page;
  featured?.classList.toggle("active",page==="featured");
  if(product)product.classList.toggle("active",page==="product");
}

function ensureFeaturedMainNav(){
  const nav=document.querySelector(".site-header .nav-links");
  if(!nav||nav.querySelector("[data-featured-main-nav]"))return;
  const link=document.createElement("a");
  link.dataset.featuredMainNav="";
  link.dataset.i18n="navFeatured";
  link.href="featured.html";
  link.textContent=translateSite("navFeatured");
  const developer=nav.querySelector('[data-i18n="navDeveloper"]');
  const fallback=nav.querySelector(".lang-switch")||nav.querySelector(".nav-cta");
  nav.insertBefore(link,developer||fallback||null);
  syncFeaturedMainNav();
}

function initNavigation(){
  document.querySelectorAll("[data-lang]").forEach(btn=>btn.addEventListener("click",()=>{lang=btn.dataset.lang;localStorage.setItem("daa-lang",lang);applyI18n();}));
  document.querySelectorAll("[data-download-scroll]").forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector("#download");if(target){e.preventDefault();target.scrollIntoView({behavior:reduceMotion.matches?"auto":"smooth"});}}));
  if(SITE_CONFIG.coffeeEnabled)document.querySelectorAll(".coffee").forEach(el=>{el.style.display="block";el.removeAttribute("aria-hidden")});
}

function initPointer(){
  if(!finePointer.matches||reduceMotion.matches)return;
  const cursor=document.querySelector(".cursor-frame");
  if(cursor){
    let frame=1;
    window.addEventListener("pointermove",e=>{cursor.style.transform=`translate3d(${e.clientX+18}px,${e.clientY+18}px,0)`},{passive:true});
    window.addEventListener("scroll",()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);frame=1+Math.round(scrollY/max*239);cursor.querySelector("b").textContent=String(frame).padStart(3,"0")},{passive:true});
  }
  document.querySelectorAll(".magnetic").forEach(el=>{
    el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/r.width;const y=(e.clientY-r.top-r.height/2)/r.height;el.style.transform=`translate3d(${x*7}px,${y*7}px,0)`});
    el.addEventListener("pointerleave",()=>el.style.transform="");
  });
  document.querySelectorAll("[data-tilt]").forEach(el=>{
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(1100px) rotateX(${-y*2.6}deg) rotateY(${x*2.6}deg) translate3d(0,-2px,0)`;
      el.querySelectorAll("[data-depth]").forEach(layer=>{const d=Number(layer.dataset.depth||1);layer.style.transform=`translate3d(${x*d*10}px,${y*d*10}px,${d*4}px)`});
    });
    el.addEventListener("pointerleave",()=>{el.style.transform="";el.querySelectorAll("[data-depth]").forEach(layer=>layer.style.transform="")});
  });
}

function initScrollProgress(){
  const bar=document.querySelector(".scroll-progress span");if(!bar)return;
  const update=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);bar.style.transform=`scaleX(${Math.min(1,scrollY/max)})`};
  update();addEventListener("scroll",update,{passive:true});
}

function initTypewriter(){
  const section=document.querySelector("[data-type-section]");
  const lines=[...document.querySelectorAll("[data-type-key]")];
  if(!section||!lines.length)return;
  const ranges=[[0,.36],[.24,.66],[.54,1]];
  const paint=progress=>lines.forEach((el,i)=>{
    const full=el.dataset.fullText||translateSite(el.dataset.typeKey),[a,b]=ranges[i]||[0,1];
    const p=Math.max(0,Math.min(1,(progress-a)/(b-a)));
    el.textContent=full.slice(0,Math.round(full.length*p));
  });
  typewriterRefresh=()=>{lines.forEach(el=>el.dataset.fullText=translateSite(el.dataset.typeKey));if(reduceMotion.matches)paint(1)};
  if(reduceMotion.matches||!window.gsap||!window.ScrollTrigger){paint(1);return}
  paint(0);
  ScrollTrigger.create({trigger:section,start:"top 30%",end:"bottom 70%",scrub:true,onUpdate:self=>paint(self.progress)});
}

function setStoryStep(step){
  document.querySelectorAll("[data-story-step]").forEach(el=>el.classList.toggle("is-active",el===step));
  const counter=document.querySelector("[data-story-frame]");if(counter)counter.textContent=step.dataset.storyStep||"001";
  const ring=document.querySelector(".focus-ring");
  if(ring&&window.gsap&&!reduceMotion.matches){
    const index=[...document.querySelectorAll("[data-story-step]")].indexOf(step);
    const positions=[[-12,-8,1],[12,-4,.82],[-6,10,1.18],[11,12,.94]][Math.max(0,index)]||[0,0,1];
    gsap.to(ring,{xPercent:positions[0],yPercent:positions[1],scale:positions[2],duration:.55,ease:"power3.out"});
  }
}

function initGSAP(){
  if(reduceMotion.matches||!window.gsap||!window.ScrollTrigger){
    document.querySelectorAll(".motion-reveal,.motion-stagger>*").forEach(el=>{el.style.opacity="1";el.style.transform="none"});
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ease:"power3.out"});

  const hero=gsap.timeline({defaults:{duration:.9}});
  hero.from(".site-header",{y:-28,opacity:0,duration:.55})
      .from(".hero-copy .eyebrow",{y:16,opacity:0},"-=.25")
      .from(".title-line",{y:70,opacity:0,clipPath:"inset(100% 0 0 0)",stagger:.12},"-=.55")
      .from(".hero-copy .lead,.hero-copy .hero-actions,.hero-copy .micro",{y:24,opacity:0,stagger:.09},"-=.5")
      .from(".motion-photo",{x:70,rotate:1.6,opacity:0,duration:1.05},"-=.75");

  if(document.querySelector(".motion-hero")){
    gsap.to(".hero-copy",{y:-70,opacity:.58,ease:"none",scrollTrigger:{trigger:".motion-hero",start:"top top",end:"bottom top",scrub:1}});
    gsap.to(".motion-photo",{y:90,scale:.965,ease:"none",scrollTrigger:{trigger:".motion-hero",start:"top top",end:"bottom top",scrub:1}});
    gsap.to(".orbit-a",{y:-120,ease:"none",scrollTrigger:{trigger:".motion-hero",start:"top top",end:"bottom top",scrub:1.2}});
    gsap.to(".orbit-b",{y:90,ease:"none",scrollTrigger:{trigger:".motion-hero",start:"top top",end:"bottom top",scrub:1.2}});
  }

  gsap.utils.toArray(".motion-reveal").forEach(el=>gsap.from(el,{y:58,opacity:0,duration:.85,scrollTrigger:{trigger:el,start:"top 86%",once:true}}));
  gsap.utils.toArray(".motion-stagger").forEach(group=>gsap.from(group.children,{y:48,opacity:0,stagger:.09,duration:.72,scrollTrigger:{trigger:group,start:"top 83%",once:true}}));
  gsap.utils.toArray(".motion-mask").forEach(el=>gsap.from(el,{clipPath:"inset(9% 7% 9% 7%)",scale:.97,opacity:.4,duration:1.05,scrollTrigger:{trigger:el,start:"top 82%",once:true}}));

  document.querySelectorAll("[data-story-step]").forEach(step=>{
    ScrollTrigger.create({trigger:step,start:"top 57%",end:"bottom 43%",onEnter:()=>setStoryStep(step),onEnterBack:()=>setStoryStep(step)});
  });
  const storyScreen=document.querySelector("[data-story-screen]");
  if(storyScreen){gsap.fromTo(storyScreen,{scale:1.045},{scale:1,ease:"none",scrollTrigger:{trigger:"[data-image-story]",start:"top 80%",end:"bottom 20%",scrub:1}})}

  const release=document.querySelector(".motion-release");
  if(release){
    gsap.from(release,{y:55,opacity:0,duration:.9,scrollTrigger:{trigger:release,start:"top 82%",once:true}});
    gsap.from(release.querySelectorAll(".release-title,.release-meta,.release-note,.notice,.download-actions"),{x:-22,opacity:0,stagger:.09,duration:.6,scrollTrigger:{trigger:release,start:"top 76%",once:true}});
  }

  document.querySelectorAll(".timeline").forEach(tl=>{
    const line=document.createElement("span");Object.assign(line.style,{position:"absolute",left:"-18px",top:"0",width:"2px",height:"100%",background:"var(--orange)",transformOrigin:"top",transform:"scaleY(0)"});tl.appendChild(line);
    gsap.to(line,{scaleY:1,ease:"none",scrollTrigger:{trigger:tl,start:"top 78%",end:"bottom 45%",scrub:1}});
    gsap.from(tl.querySelectorAll(".timeline-item"),{x:30,opacity:0,stagger:.12,duration:.6,scrollTrigger:{trigger:tl,start:"top 80%",once:true}});
  });

  const productFlow=document.querySelector(".product-motion-flow");
  if(productFlow&&innerWidth>900){
    const visual=productFlow.querySelector(".product-motion-visual");
    gsap.to(visual,{yPercent:12,ease:"none",scrollTrigger:{trigger:productFlow,start:"top 75%",end:"bottom 25%",scrub:1}});
  }

  ScrollTrigger.refresh();
}

function init(){
  ensureFeaturedMainNav();
  applyI18n();
  syncFeaturedMainNav();
  initNavigation();
  initScrollProgress();
  initPointer();
  initGSAP();
  initTypewriter();
}
document.addEventListener("DOMContentLoaded",init);