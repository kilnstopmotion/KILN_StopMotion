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
  const intro = document.querySelector("[data-showcase-intro]");
  if (!intro) return;
  const finaleTitle = intro.querySelector(".showcase-finale h2");
  const finaleTitleMarkup = finaleTitle?.innerHTML;
  const segmenter = typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
  let timeline;

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
      button.addEventListener("click", () => requestAnimationFrame(() => {
        applyShowcaseLanguage();
        buildShowcase();
      }));
    });
  }

  // Keep words together when they wrap, and keep Vietnamese accents in one grapheme.
  function splitText(element) {
    const accessibleText = element.textContent;
    const nodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const part of node.textContent.split(/(\s+)/u)) {
        if (!part) continue;
        if (/^\s+$/u.test(part)) {
          fragment.append(document.createTextNode(part));
          continue;
        }
        const word = document.createElement("span");
        word.className = "showcase-word";
        word.setAttribute("aria-hidden", "true");
        const graphemes = segmenter ? [...segmenter.segment(part)].map(item => item.segment) : Array.from(part);
        for (const grapheme of graphemes) {
          const char = document.createElement("span");
          char.className = "showcase-char";
          char.textContent = grapheme;
          word.append(char);
        }
        fragment.append(word);
      }
      node.replaceWith(fragment);
    }
    const accessibleCopy = document.createElement("span");
    accessibleCopy.className = "showcase-sr-only";
    accessibleCopy.textContent = accessibleText;
    element.append(accessibleCopy);
    return [...element.querySelectorAll(".showcase-char")];
  }

  function staggerOver(chars, spread) {
    return chars.length > 1 ? spread / (chars.length - 1) : 0;
  }

  function reveal(tl, chars, from, start, spread, duration = .75) {
    tl.fromTo(chars, { opacity: 0, ...from }, {
      opacity: 1, x: 0, y: 0, z: 0, scale: 1,
      rotation: 0, rotationX: 0, rotationY: 0, filter: "blur(0px)",
      duration, ease: "power3.out", stagger: staggerOver(chars, spread), immediateRender: false
    }, start);
  }

  function blink(tl, chars, start, spread) {
    const stagger = staggerOver(chars, spread);
    tl.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: .09, ease: "steps(1)", stagger, immediateRender: false }, start)
      .to(chars, { opacity: .25, duration: .1, ease: "steps(1)", stagger }, start + .11)
      .to(chars, { opacity: 1, duration: .13, ease: "steps(1)", stagger }, start + .25);
  }

  function typeIn(tl, chars, start, spread) {
    tl.fromTo(chars, { opacity: 0 }, {
      opacity: 1, duration: .02, ease: "steps(1)",
      stagger: staggerOver(chars, spread), immediateRender: false
    }, start);
  }

  function animateSceneText(tl, text) {
    reveal(tl, text[0].title, { y: 30, z: -90, scale: .15, filter: "blur(12px)" }, .35, 3.6, 1.2);
    reveal(tl, text[0].paragraph, { y: 14, scale: .8, filter: "blur(6px)" }, 3.25, 1.7, .8);

    blink(tl, text[1].title, 12.35, 3.2);
    blink(tl, text[1].paragraph, 14.1, 2.1);

    reveal(tl, text[2].title, {
      x: i => i % 2 ? 48 : -48, y: i => i % 3 ? -14 : 16,
      rotation: i => i % 2 ? 12 : -12
    }, 26.35, 3, .75);
    reveal(tl, text[2].paragraph, { x: 36, y: 12 }, 28.2, 2.2, .6);

    typeIn(tl, text[3].title, 41.4, 3.5);
    typeIn(tl, text[3].paragraph, 44, 3.4);

    reveal(tl, text[4].title, {
      x: i => (i % 5 - 2) * 55, y: i => (i % 3 - 1) * 36,
      rotation: i => (i % 5 - 2) * 9, scale: .66, filter: "blur(9px)"
    }, 57.35, 3.5, .95);
    reveal(tl, text[4].paragraph, { y: 30, scale: .85, filter: "blur(5px)" }, 60.3, 2.1, .7);

    reveal(tl, text[5].title, { y: 46, rotationX: -85, scale: .9 }, 70.3, 2.8, .85);
    reveal(tl, text[5].paragraph, { y: 22, rotationX: -45 }, 73, 1.8, .65);
  }

  function buildShowcase() {
    if (reduceMotion.matches || !window.gsap || !window.ScrollTrigger) return;
    const stage = intro.querySelector(".showcase-stage");
    const scenes = [...intro.querySelectorAll(".showcase-copy")];
    const finale = intro.querySelector(".showcase-finale");
    const logo = intro.querySelector(".showcase-logo-wrap");
    const flash = intro.querySelector(".showcase-flash");
    const topline = intro.querySelector(".showcase-topline");
    const frameReadout = intro.querySelector("[data-showcase-frame]");
    const header = document.querySelector(".site-header.showcase-header");
    const headerBrand = header?.querySelector("[data-showcase-brand]");
    const finalActions = intro.querySelector(".showcase-final-actions");

    if (!stage || scenes.length < 6 || !finale || !logo || !finalActions || !finaleTitle) return;

    timeline?.scrollTrigger?.kill();
    timeline?.kill();
    finaleTitle.innerHTML = finaleTitleMarkup;
    const text = scenes.map(scene => ({
      title: splitText(scene.querySelector("h1,h2")),
      paragraph: splitText(scene.querySelector("p"))
    }));
    const finalTitleChars = splitText(finaleTitle);

    document.documentElement.classList.add("showcase-enhanced");
    gsap.registerPlugin(ScrollTrigger);

    header?.setAttribute("data-intro-state", "story");
    gsap.set(stage, { backgroundColor: '#050608' });
    gsap.set(scenes, { opacity: 0, y: 34, rotationX: 9, transformOrigin: 'center bottom' });
    gsap.set(scenes.slice(0, 4), { color: '#f3f3f5' });
    gsap.set(scenes[0], { opacity: 1, y: 0, rotationX: 0 });
    gsap.set([...text.flatMap(scene => [...scene.title, ...scene.paragraph]), ...finalTitleChars], { opacity: 0 });
    gsap.set(topline, { color: '#b3badb' });
    gsap.set(frameReadout, { color: '#f3f3f5' });
    gsap.set(flash, { opacity: 0 });
    gsap.set(finale, { opacity: 0 });
    gsap.set(logo, { opacity: 0, scale: 0.24, rotation: -8, filter: "blur(12px)" });
    if (finalActions) gsap.set(finalActions, { opacity: 0, y: 20 });

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

      .to(scenes[1], { opacity: 1, y: 0, duration: 2.4, ease: "power3.out" }, 12)
      .to(scenes[1], { opacity: 0, y: -26, duration: 2.1, ease: "power2.in" }, 24)
      .to(scenes[2], { opacity: 1, y: 0, duration: 2.4, ease: "power3.out" }, 26)
      .to(scenes[2], { opacity: 0, y: -26, duration: 2.1, ease: "power2.in" }, 39)
      .to(scenes[3], { opacity: 1, y: 0, duration: 2.4, ease: "power3.out" }, 41)
      .to(scenes[3], { opacity: 0, y: -28, duration: 2.2, ease: "power2.in" }, 55)
      .to(scenes[4], { color: "#f8f5ed", opacity: 1, y: 0, duration: 2.5, ease: "power3.out" }, 57)
      .to(scenes[4].querySelector("p"), { color: "#c6c2b8", duration: 2 }, 57)
      .to(scenes[4], { opacity: 0, y: -28, duration: 2.2, ease: "power2.in" }, 70)

      .to(scenes[5], { color: "#f8f5ed", opacity: 1, y: 0, duration: 2.6, ease: "power3.out" }, 70)
      .to(scenes[5].querySelector("p"), { color: "#c6c2b8", duration: 2 }, 70)
      .to(scenes[5], { opacity: 0, y: -24, duration: 2.1, ease: "power2.in" }, 80)

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
      .to(finalActions, { opacity: 1, y: 0, duration: 2, ease: "power3.out" }, 94);

    animateSceneText(tl, text);
    reveal(tl, finalTitleChars, { y: 34, z: -65, rotationY: -75 }, 89.2, 1.6, .55);
    timeline = tl;
    ScrollTrigger.refresh();
  }

  function initShowcase() {
    bindLanguageSync();
    buildShowcase();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShowcase, { once: true });
  } else {
    initShowcase();
  }
})();
