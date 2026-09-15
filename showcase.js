(() => {
  const copy = {
    vi: {
      s0k: "FRAME / 001",
      s0h: "Stop-motion bắt đầu bằng một frame.",
      s0p: "Nhưng một cảnh quay không dừng ở đó.",
      s1k: "FRAME / FRAME / FRAME",
      s1h: "Rồi thêm một frame. Và thêm một quyết định.",
      s1p: "Chụp. Kiểm tra. Dịch chuyển. Chụp lại. Mỗi thao tác nhỏ đều cần đúng nhịp.",
      s2k: "TIMING / CONTINUITY",
      s2h: "Chỉ lệch một nhịp, chuyển động đã khác.",
      s2p: "Timing, onion skin, playback và continuity phải luôn ở đúng chỗ khi người làm cần tới.",
      s3k: "PRODUCTION / NOISE",
      s3h: "Frame. Take. Ghi chú. Phiên bản.",
      s3p: "Càng đi xa, càng dễ để những chi tiết của cảnh quay rơi vào nhiều nơi khác nhau.",
      s4k: "THE FRICTION",
      s4h: "Khi công cụ làm bạn rời khỏi chuyển động, nó trở thành một phần của vấn đề.",
      s4p: "Stop-motion vốn đã đủ tỉ mỉ. Phần mềm không nên khiến quá trình đó nặng hơn.",
      s5k: "THE TURN",
      s5h: "Vậy nếu mọi thứ cùng đi theo nhịp frame-by-frame?",
      s5p: "Một không gian để chụp, animate, review và tổ chức mà không làm đứt mạch sáng tạo.",
      cue: "SCROLL / ADVANCE FRAME",
      finalePre: "Xin hân hạnh giới thiệu",
      finaleCopy: "Công cụ sản xuất stop-motion được xây quanh từng khung hình, từng take và những quyết định nhỏ khiến chuyển động trở nên có hồn.",
      explore: "Khám phá phần mềm",
      download: "Tải xuống"
    },
    en: {
      s0k: "FRAME / 001",
      s0h: "Stop-motion begins with one frame.",
      s0p: "But a shot never ends there.",
      s1k: "FRAME / FRAME / FRAME",
      s1h: "Then one more frame. And one more decision.",
      s1p: "Capture. Check. Move. Capture again. Every small action has to land at the right rhythm.",
      s2k: "TIMING / CONTINUITY",
      s2h: "Shift the rhythm by a little, and the motion already feels different.",
      s2p: "Timing, onion skin, playback and continuity need to be exactly where the animator needs them.",
      s3k: "PRODUCTION / NOISE",
      s3h: "Frames. Takes. Notes. Versions.",
      s3p: "As a production grows, the small details of a shot can easily scatter across too many places.",
      s4k: "THE FRICTION",
      s4h: "When the tool pulls you away from the motion, it becomes part of the problem.",
      s4p: "Stop-motion is already meticulous. The software should not make that process heavier.",
      s5k: "THE TURN",
      s5h: "What if everything moved with the rhythm of frame-by-frame work?",
      s5p: "One space to capture, animate, review and organize without breaking the creative flow.",
      cue: "SCROLL / ADVANCE FRAME",
      finalePre: "Proudly introducing",
      finaleCopy: "Stop-motion production software shaped around every frame, every take and the small decisions that make movement feel alive.",
      explore: "Explore the product",
      download: "Download"
    }
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)");
  const intro = document.querySelector("[data-showcase-intro]");
  if (!intro) return;

  function currentLang() {
    return localStorage.getItem("daa-lang") || document.documentElement.lang || "vi";
  }

  function applyShowcaseLanguage() {
    const lang = currentLang() === "en" ? "en" : "vi";
    document.querySelectorAll("[data-showcase-key]").forEach((el) => {
      const value = copy[lang][el.dataset.showcaseKey];
      if (value) el.textContent = value;
    });
  }

  function bindLanguageSync() {
    applyShowcaseLanguage();
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => requestAnimationFrame(applyShowcaseLanguage));
    });
  }

  function initCardDepth() {
    if (!finePointer.matches || reduceMotion.matches) return;
    const stage = intro.querySelector(".showcase-stage");
    const cards = [...intro.querySelectorAll(".showcase-frame-card")];
    if (!stage || !cards.length) return;

    let raf = 0;
    stage.addEventListener("pointermove", (event) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = event.clientX / Math.max(1, innerWidth) - 0.5;
        const y = event.clientY / Math.max(1, innerHeight) - 0.5;
        cards.forEach((card, index) => {
          const depth = ((index % 3) + 1) * 1.6;
          card.style.setProperty("--pointer-x", `${x * depth}px`);
          card.style.setProperty("--pointer-y", `${y * depth}px`);
        });
      });
    }, { passive: true });
  }

  function initShowcase() {
    bindLanguageSync();
    if (reduceMotion.matches || !window.gsap || !window.ScrollTrigger) return;

    document.documentElement.classList.add("showcase-enhanced");
    gsap.registerPlugin(ScrollTrigger);

    const stage = intro.querySelector(".showcase-stage");
    const scenes = [...intro.querySelectorAll(".showcase-copy")];
    const cards = [...intro.querySelectorAll(".showcase-frame-card")];
    const finale = intro.querySelector(".showcase-finale");
    const logo = intro.querySelector(".showcase-logo-wrap");
    const flash = intro.querySelector(".showcase-flash");
    const topline = intro.querySelector(".showcase-topline");
    const frameReadout = intro.querySelector("[data-showcase-frame]");
    const header = document.querySelector(".site-header.showcase-header");
    const headerBrand = header?.querySelector("[data-showcase-brand]");
    const finalActions = intro.querySelector(".showcase-final-actions");

    if (!stage || scenes.length < 6 || !finale || !logo) return;

    header?.setAttribute("data-intro-state", "story");
    gsap.set(stage, { backgroundColor: '#050608' });
    gsap.set(scenes, { opacity: 0, y: 34, rotationX: 9, transformOrigin: 'center bottom' });
    gsap.set(scenes.slice(0, 4), { color: '#f3f3f5' });
    gsap.set(scenes[0], { opacity: 1, y: 0, rotationX: 0 });
    gsap.set(cards, { opacity: 0.08, scale: 0.88, filter: "saturate(.4) contrast(.92)" });
    gsap.set(finale, { opacity: 0 });
    gsap.set(logo, { opacity: 0, scale: 0.24, rotation: -8, filter: "blur(12px)" });
    if (finalActions) gsap.set(finalActions, { opacity: 0, y: 20 });

    const showScene = (index, start, end) => {
      const scene = scenes[index];
      const fadeIn = Math.min(2.4, Math.max(1.2, (end - start) * 0.2));
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(scene, { opacity: 1, y: 0, duration: fadeIn }, start)
        .to(scene, { opacity: 1, duration: Math.max(.8, end - start - fadeIn * 2) }, start + fadeIn)
        .to(scene, { opacity: 0, y: -28, duration: fadeIn }, end - fadeIn);
    };

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: intro,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.75,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const frame = Math.max(1, Math.min(144, 1 + Math.round(self.progress * 143)));
          const label = String(frame).padStart(3, "0");
          if (frameReadout) frameReadout.textContent = label;
          if (headerBrand && self.progress < .87) headerBrand.textContent = `FRAME / ${label}`;
          if (header && self.progress < .87) header.setAttribute("data-intro-state", "story");
          if (headerBrand && self.progress >= .87) headerBrand.textContent = "DA&A StopMotion";
          if (header && self.progress >= .87) header.setAttribute("data-intro-state", "final");
          finale.classList.toggle("is-interactive", self.progress > .94);
        }
      }
    });

    tl.set(scenes[0], { opacity: 1, y: 0 }, 0)
      .to(stage, { backgroundColor: '#11152e', duration: 25, ease: 'none' }, 4)
      .to(stage, { backgroundColor: '#1f2251', duration: 22, ease: 'none' }, 28)
      .to(stage, { backgroundColor: '#050608', duration: 17, ease: 'none' }, 55)
      .to(scenes.slice(1), { rotationX: 0, duration: 4, stagger: 14, ease: 'power2.out' }, 11)
      .to(scenes[0], { opacity: 0, y: -24, duration: 2.2, ease: "power2.in" }, 10.5)

      .to(cards[0], { opacity: .48, scale: 1, x: 32, y: 16, rotation: -2.2, filter: "saturate(.5) contrast(.95)", duration: 5, ease: "steps(5)" }, 8)
      .to(cards[1], { opacity: .42, scale: .98, x: -24, y: 24, rotation: 2.4, filter: "saturate(.45) contrast(.94)", duration: 5, ease: "steps(5)" }, 10)

      .to(scenes[1], { opacity: 1, y: 0, duration: 2.4, ease: "power3.out" }, 12)
      .to(scenes[1], { opacity: 0, y: -26, duration: 2.1, ease: "power2.in" }, 24)
      .to(cards[0], { x: 54, y: 4, rotation: -1, duration: 6, ease: "steps(4)" }, 17)
      .to(cards[1], { x: -46, y: 6, rotation: 1.2, duration: 6, ease: "steps(4)" }, 17)
      .to(cards[2], { opacity: .45, scale: 1, x: 20, y: -18, rotation: 1.6, filter: "saturate(.45) contrast(.95)", duration: 5, ease: "steps(5)" }, 19)

      .to(scenes[2], { opacity: 1, y: 0, duration: 2.4, ease: "power3.out" }, 26)
      .to(scenes[2], { opacity: 0, y: -26, duration: 2.1, ease: "power2.in" }, 39)
      .to(cards[3], { opacity: .48, scale: 1, x: -16, y: -22, rotation: -1.8, filter: "saturate(.42) contrast(.95)", duration: 5, ease: "steps(5)" }, 28)
      .to(cards[0], { x: 82, y: 32, duration: 7, ease: "steps(5)" }, 31)
      .to(cards[2], { x: 42, y: -34, duration: 7, ease: "steps(5)" }, 31)

      .to(scenes[3], { opacity: 1, y: 0, duration: 2.4, ease: "power3.out" }, 41)
      .to(scenes[3], { opacity: 0, y: -28, duration: 2.2, ease: "power2.in" }, 55)
      .to(cards[4], { opacity: .43, scale: 1, x: 14, y: 38, rotation: -2.5, filter: "saturate(.35) contrast(.94)", duration: 5, ease: "steps(4)" }, 42)
      .to(cards[5], { opacity: .4, scale: 1, x: -12, y: 34, rotation: 2.1, filter: "saturate(.35) contrast(.94)", duration: 5, ease: "steps(4)" }, 45)
      .to(cards, { opacity: .62, scale: 1.035, duration: 7, stagger: .16, ease: "steps(4)" }, 48)

      .to(scenes[4], { color: "#f8f5ed", opacity: 1, y: 0, duration: 2.5, ease: "power3.out" }, 57)
      .to(scenes[4].querySelector("p"), { color: "#c6c2b8", duration: 2 }, 57)
      .to(cards, { opacity: .74, scale: 1.08, filter: "saturate(.18) brightness(.72) contrast(1.05)", duration: 8, stagger: .12, ease: "steps(5)" }, 58)
      .to(scenes[4], { opacity: 0, y: -28, duration: 2.2, ease: "power2.in" }, 70)

      .to(scenes[5], { color: "#f8f5ed", opacity: 1, y: 0, duration: 2.6, ease: "power3.out" }, 70)
      .to(scenes[5].querySelector("p"), { color: "#c6c2b8", duration: 2 }, 70)
      .to(cards, { x: (i) => (i % 2 ? -18 : 18), y: (i) => (i < 2 ? 12 : -10), rotation: (i) => (i % 2 ? 1 : -1), duration: 7, stagger: .1, ease: "steps(4)" }, 72)
      .to(scenes[5], { opacity: 0, y: -24, duration: 2.1, ease: "power2.in" }, 80)

      .to(cards, { opacity: .16, scale: .78, x: 0, y: 0, rotation: 0, filter: "saturate(.6) brightness(.9)", duration: 5, stagger: .08, ease: "power3.inOut" }, 80)
      .to(flash, { opacity: .18, duration: .55, ease: "power2.out" }, 84)
      .to(stage, { backgroundColor: "#f2efe7", duration: 3.5, ease: "power3.out" }, 84)
      .to(topline, { color: '#7a756b', duration: 3.5, ease: 'none' }, 84)
      .to(frameReadout, { color: '#151512', duration: 3.5, ease: 'none' }, 84)
      .to(flash, { opacity: 0, duration: 1.1, ease: "power2.in" }, 84.55)
      .to(finale, { opacity: 1, duration: 2.2, ease: "power3.out" }, 85)
      .to(logo, { opacity: 1, scale: 1.12, rotation: 1.2, filter: "blur(0px)", duration: 4.2, ease: "power4.out" }, 86)
      .to(logo, { scale: 1, rotation: 0, duration: 1.8, ease: "steps(3)" }, 90.2)
      .fromTo(finale.querySelector("h2"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2.6, ease: "power3.out" }, 89)
      .fromTo(finale.querySelector(".showcase-positioning"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 2.1, ease: "power3.out" }, 91)
      .fromTo(finale.querySelector(".showcase-philosophy"), { opacity: 0 }, { opacity: 1, duration: 1.8 }, 93)
      .to(finalActions, { opacity: 1, y: 0, duration: 2, ease: "power3.out" }, 94)
      .to(cards, { opacity: .06, duration: 2.5 }, 95);

    ScrollTrigger.refresh();
    initCardDepth();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShowcase, { once: true });
  } else {
    initShowcase();
  }
})();
