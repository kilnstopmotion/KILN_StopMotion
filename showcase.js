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
  const compactMotion = window.matchMedia("(max-width: 900px), (pointer: coarse)");
  const originalMarkup = new Map();
  const segmenter = typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
  let timeline;
  let animationContext;
  let scrollController;
  let introCompleted = false;
  try { introCompleted = sessionStorage.getItem("daa-intro-completed") === "1"; } catch (_) { /* Page-lifetime fallback. */ }

  // Owns input and a bounded virtual target, never the typography timeline.
  // Lenis keeps its normal settings; its filter ignores only events we consumed.
  class IntroScrollController {
    constructor({ trigger, desktopFactor = .33, touchFactor = .5, maxDelta = 120, smoothing = .12 }) {
      Object.assign(this, { trigger, desktopFactor, touchFactor, maxDelta, smoothing });
      this.consumed = new WeakSet();
      this.listeners = [];
      this.current = this.target = this.lastWritten = window.scrollY;
      this.exitDelta = 0;
      this.update = this.update.bind(this);
      this.refresh = this.refresh.bind(this);
    }

    listen(type, handler, passive = false) {
      const bound = handler.bind(this);
      window.addEventListener(type, bound, { capture: true, passive });
      this.listeners.push(() => window.removeEventListener(type, bound, true));
    }

    enable() {
      if (introCompleted || reduceMotion.matches || this.enabled) return;
      this.enabled = true;
      this.listen("wheel", this.handleWheel);
      this.listen("touchstart", this.handleTouchStart, true);
      this.listen("touchmove", this.handleTouchMove);
      this.listen("touchend", this.handleTouchEnd, true);
      this.listen("touchcancel", this.handleTouchEnd, true);
      this.listen("keydown", this.handleKey);
      this.listen("click", this.handleClick, true);
      this.listen("scroll", this.handleNativeScroll, true);
      window.ScrollTrigger.addEventListener("refresh", this.refresh);
      this.refresh();
    }

    connectLenis() {
      const lenis = window.DAAMotion?.lenis;
      if (lenis === this.lenis) return lenis;
      this.disconnectLenis();
      if (lenis) {
        this.lenis = lenis;
        this.previousFilter = lenis.options.virtualScroll;
        this.filter = data => this.consumed.has(data.event) ? false : this.previousFilter?.(data);
        lenis.options.virtualScroll = this.filter;
      }
      return lenis;
    }

    disconnectLenis() {
      if (this.lenis && this.lenis.options.virtualScroll === this.filter) this.lenis.options.virtualScroll = this.previousFilter;
      this.lenis = null;
    }

    refresh() {
      this.stop();
      this.current = this.target = this.lastWritten = window.scrollY;
      this.start = this.trigger.start;
      this.entry = Math.max(0, this.start - window.innerHeight);
      this.end = this.trigger.end;
      this.length = this.end - this.start;
      if (this.length > 0 && window.scrollY >= this.end - this.length * .005) this.complete();
    }

    // Leave form controls, editable content and nested scrollers to their owners.
    ownsTarget(event, delta) {
      for (const node of event.composedPath()) {
        if (!(node instanceof HTMLElement)) continue;
        if (node === document.body || node === document.documentElement) break;
        if (node.isContentEditable || node.matches("input,textarea,select,[role='slider'],[role='spinbutton'],[data-lenis-prevent],[data-lenis-prevent-wheel],[data-lenis-prevent-touch]")) return false;
        if (node.scrollHeight > node.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(node).overflowY)) {
          if (delta < 0 ? node.scrollTop > 0 : node.scrollTop + node.clientHeight < node.scrollHeight - 1) return false;
        }
      }
      return true;
    }

    canControl(event, delta) {
      if (!this.enabled || reduceMotion.matches || !event.cancelable || event.defaultPrevented || !Number.isFinite(delta) || !delta) return false;
      const position = window.scrollY;
      if (position >= this.end - this.length * .005) { this.complete(); return false; }
      if (position < this.entry - 1 || this.length <= 0 || !this.ownsTarget(event, delta)) return false;
      const lenis = this.connectLenis();
      if (lenis?.isStopped || lenis?.isLocked) { this.stop(); return false; }
      if (position <= this.entry + 1 && delta < 0) { this.stop(); return false; }
      return true;
    }

    consume(event, rawDelta, factor, maxDelta = this.maxDelta) {
      if (!this.canControl(event, rawDelta)) return false;
      this.consumed.add(event);
      event.preventDefault();
      if (!this.ticking) {
        this.current = this.target = this.lastWritten = window.scrollY;
        // Cancel only existing scroll inertia, keeping Lenis' public state in sync.
        this.lenis?.scrollTo(this.current, { immediate: true });
      }
      const delta = Math.max(-maxDelta, Math.min(maxDelta, rawDelta)) * factor;
      if (delta < 0) this.exitDelta = 0;
      const remaining = this.end - this.target;
      if (delta > remaining) this.exitDelta += Math.max(0, rawDelta - remaining / factor);
      // A burst cannot queue multiple scenes of motion after the user stops input.
      const backlog = this.length * .06;
      this.target = Math.max(this.entry, this.current - backlog,
        Math.min(this.end, this.current + backlog, this.target + delta));
      if (!this.ticking) {
        this.ticking = true;
        window.gsap.ticker.add(this.update);
      }
      return true;
    }

    handleWheel(event) {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      this.consume(event, event.deltaY * unit, this.desktopFactor);
    }

    handleTouchStart(event) {
      this.touch = null;
      if (event.touches.length !== 1) { this.stop(); return; }
      const point = event.touches[0];
      // Browser back/forward edge gestures and pinch zoom always stay native.
      if (point.clientX < 24 || point.clientX > window.innerWidth - 24) return;
      this.touch = { id: point.identifier, x: point.clientX, y: point.clientY, axis: null };
    }

    handleTouchMove(event) {
      if (!this.touch || event.touches.length !== 1) { this.touch = null; this.stop(); return; }
      const point = event.touches[0];
      if (point.identifier !== this.touch.id) return;
      const dx = this.touch.x - point.clientX;
      const dy = this.touch.y - point.clientY;
      if (!this.touch.axis) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 4) return;
        this.touch.axis = Math.abs(dy) > Math.abs(dx) ? "vertical" : "horizontal";
      }
      this.touch.x = point.clientX;
      this.touch.y = point.clientY;
      if (this.touch.axis === "vertical" && !this.consume(event, dy, this.touchFactor)) {
        // Once the browser owns a gesture, do not try to reclaim it mid-swipe.
        this.touch = null;
        this.stop();
      }
    }

    handleTouchEnd() { this.touch = null; }

    handleKey(event) {
      if (["Escape", "End", "Home"].includes(event.key)) { this.complete(); return; }
      const element = event.target;
      if (element instanceof HTMLElement && (element.isContentEditable || element.closest("input,textarea,select,button,a[href],[role='button'],[role='slider']"))) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const medium = Math.min(360, window.innerHeight * .65);
      const deltas = { ArrowDown: 48, ArrowUp: -48, PageDown: medium, PageUp: -medium, " ": event.shiftKey ? -medium : medium };
      if (deltas[event.key]) this.consume(event, deltas[event.key], this.desktopFactor, 360);
    }

    handleClick(event) {
      if (event.target instanceof Element && event.target.closest("a[href],[data-download-scroll]")) this.complete();
    }

    handleNativeScroll() {
      if (window.ScrollTrigger.isRefreshing) return;
      const position = window.scrollY;
      if (position >= this.end - this.length * .005) { this.complete(); return; }
      // Scrollbar, focus, hash navigation or external scrollTo override queued input.
      if (Math.abs(position - this.lastWritten) > 2) {
        this.stop();
        this.current = this.target = this.lastWritten = position;
      }
    }

    write(position) {
      this.lastWritten = Math.round(position);
      const lenis = this.connectLenis();
      if (lenis) lenis.scrollTo(this.lastWritten, { immediate: true });
      else window.scrollTo({ top: this.lastWritten, left: window.scrollX, behavior: "instant" });
      window.ScrollTrigger.update();
    }

    update(_time, deltaTime) {
      if (!this.enabled || reduceMotion.matches) { this.destroy(); return; }
      if (this.lenis?.isStopped || this.lenis?.isLocked) { this.stop(); return; }
      const difference = this.target - this.current;
      const alpha = 1 - Math.pow(1 - this.smoothing, Math.min(deltaTime, 64) / (1000 / 60));
      const maxStep = this.length * .012;
      this.current += Math.max(-maxStep, Math.min(maxStep, difference * alpha));
      if (Math.abs(this.target - this.current) < .5) this.current = this.target;
      if (this.current >= this.end - this.length * .005) {
        const destination = this.end + this.exitDelta;
        this.write(destination);
        this.complete();
        return;
      }
      this.write(this.current);
      if (this.current === this.target) this.stop();
    }

    stop() {
      window.gsap.ticker.remove(this.update);
      this.ticking = false;
      this.exitDelta = 0;
    }

    complete() {
      introCompleted = true;
      try { sessionStorage.setItem("daa-intro-completed", "1"); } catch (_) { /* Retain in memory. */ }
      this.destroy();
    }

    destroy() {
      this.stop();
      this.enabled = false;
      this.touch = null;
      this.listeners.splice(0).forEach(remove => remove());
      window.ScrollTrigger.removeEventListener("refresh", this.refresh);
      this.disconnectLenis();
    }
  }

  function currentLang() {
    try {
      return localStorage.getItem("daa-lang") || document.documentElement.lang || "vi";
    } catch (_) { return document.documentElement.lang || "vi"; }
  }

  function applyShowcaseLanguage() {
    const lang = currentLang() === "en" ? "en" : "vi";
    intro.querySelectorAll("[data-showcase-key]").forEach((el) => {
      const value = copy[lang][el.dataset.showcaseKey];
      if (value) el.textContent = value;
    });
  }

  function bindLanguageSync() {
    document.querySelectorAll("[data-lang]").forEach((button) => {
      // One deferred rebuild after all navigation listeners apply their language.
      // This schedules setup only; every animation remains on the scroll timeline.
      button.addEventListener("click", () => requestAnimationFrame(buildShowcase));
    });
  }

  // Keep words together when they wrap, and keep Vietnamese accents in one grapheme.
  function splitText(element) {
    if (originalMarkup.has(element)) element.innerHTML = originalMarkup.get(element);
    else originalMarkup.set(element, element.innerHTML);
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
        const graphemes = segmenter ? [...segmenter.segment(part)].map(item => item.segment)
          : (part.normalize("NFC").match(/\P{M}\p{M}*|\p{M}+/gu) || []);
        for (const grapheme of graphemes) {
          const char = document.createElement("span");
          char.className = "showcase-char";
          char.setAttribute("aria-hidden", "true");
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

  function blink(tl, chars, start, spread, compact) {
    const stagger = staggerOver(chars, spread);
    tl.fromTo(chars, {
      opacity: 0, x: i => i % 4 === 0 ? (i % 2 ? 3 : -3) : 0,
      z: compact ? 0 : -24, scaleY: i => i % 4 === 0 ? .96 : 1
    }, {
      opacity: 1, duration: .08, ease: "steps(1)", stagger, immediateRender: false
    }, start)
      .to(chars, { opacity: .25, duration: .1, ease: "steps(1)", stagger }, start + .12)
      .to(chars, { opacity: 1, x: 0, z: 0, scaleY: 1, duration: .1, ease: "steps(1)", stagger }, start + .28);
  }

  function typeIn(tl, chars, start, spread) {
    // Exposure holds, including punctuation beats, are repeatable in either direction.
    const pattern = [1, 2, 1, 1, 3, 2, 1, 2];
    let frame = 0;
    const frames = chars.map((char, i) => {
      const at = frame;
      frame += /[.,!?;:]/u.test(char.textContent) ? 4 : pattern[i % pattern.length];
      return at;
    });
    chars.forEach((char, i) => {
      const at = start + frames[i] / Math.max(1, frame) * spread;
      tl.fromTo(char, { opacity: 0 }, {
        opacity: 1, duration: .025, ease: "steps(1)", immediateRender: false
      }, at);
      if (char === char.parentElement.lastElementChild) {
        tl.fromTo(char.parentElement, { y: 0 }, { y: 1, duration: .025, ease: "steps(1)", immediateRender: false }, at + .025)
          .to(char.parentElement, { y: 0, duration: .065, ease: "steps(1)" }, at + .08);
      }
    });
  }

  function materialize(tl, chars, at, spread, compact) {
    chars.forEach((char, i) => {
      const start = at + i * staggerOver(chars, spread) + (i % 3) * .045;
      tl.fromTo(char, {
        opacity: 0, z: compact ? -35 : -150 - (i % 3) * 12,
        scale: .24, y: compact ? 14 : 28, filter: compact ? "blur(4px)" : "blur(12px)"
      }, {
        opacity: 1, z: 0, scale: 1.018, y: -.6, filter: "blur(0px)",
        duration: 1.05, ease: "power3.out", immediateRender: false
      }, start)
        .to(char, { scale: 1, y: 0, duration: .28, ease: "power2.out" }, start + 1.05);
    });
  }

  function collisionReveal(tl, chars, at, spread, compact) {
    const strength = compact ? .4 : 1;
    chars.forEach((char, i) => {
      const start = at + i * staggerOver(chars, spread);
      tl.fromTo(char, {
        opacity: 0, x: (i % 2 ? 55 : -55) * strength,
        y: (i % 3 - 1) * 18 * strength, z: -(40 + i % 3 * 20) * strength,
        rotation: (i % 2 ? 10 : -10) * strength
      }, {
        opacity: 1, x: i % 2 ? -.8 : .8, y: 0, z: 0, rotation: 0,
        duration: .85, ease: "power3.out", immediateRender: false
      }, start)
        .to(char, { x: 0, duration: .25, ease: "power2.out" }, start + .85);
    });
  }

  function chaosToOrder(tl, chars, at, spread, compact) {
    const strength = compact ? .35 : 1;
    chars.forEach((char, i) => {
      const start = at + i * staggerOver(chars, spread);
      const x = (i % 5 - 2) * 55 * strength;
      const y = (i % 3 - 1) * 38 * strength;
      tl.fromTo(char, {
        opacity: 0, x, y, z: -(i % 4 + 1) * 24 * strength,
        rotation: (i % 5 - 2) * 12 * strength,
        rotationY: (i % 3 - 1) * 35 * strength, scale: .7,
        filter: compact ? "blur(3px)" : "blur(8px)"
      }, {
        opacity: .8, x: x * .3 - y * .45, y: y * .25 + x * .2,
        z: -12 * strength, rotation: (i % 2 ? -4 : 4) * strength,
        rotationY: 0, scale: .94, filter: compact ? "blur(1px)" : "blur(2px)",
        duration: .5, ease: "power1.in", immediateRender: false
      }, start)
        .to(char, {
          opacity: 1, x: 0, y: 0, z: 0, rotation: 0, scale: 1, filter: "blur(0px)",
          duration: .85, ease: "power3.out"
        }, start + .5);
    });
  }

  function flipCascade(tl, chars, at, spread, compact) {
    reveal(tl, chars, {
      y: compact ? 18 : 42, rotationX: compact ? -35 : -85,
      rotationY: i => (i % 2 ? 1 : -1) * (compact ? 2 : 6), scale: .9
    }, at, spread, .9);
  }

  function animateSceneText(tl, text, compact) {
    const spread = compact ? .78 : 1;
    materialize(tl, text[0].title, .35, 3.4 * spread, compact);
    materialize(tl, text[0].paragraph, 3.3, 1.6 * spread, compact);
    blink(tl, text[1].title, 14.35, 3.2 * spread, compact);
    blink(tl, text[1].paragraph, 16.4, 2.1 * spread, compact);
    collisionReveal(tl, text[2].title, 28.35, 3 * spread, compact);
    collisionReveal(tl, text[2].paragraph, 30.5, 2.1 * spread, compact);
    typeIn(tl, text[3].title, 42.35, 3.5 * spread);
    typeIn(tl, text[3].paragraph, 45, 3.3 * spread);
    chaosToOrder(tl, text[4].title, 56.35, 3.5 * spread, compact);
    chaosToOrder(tl, text[4].paragraph, 59.4, 2.1 * spread, compact);
    flipCascade(tl, text[5].title, 70.35, 2.8 * spread, compact);
    flipCascade(tl, text[5].paragraph, 73.1, 1.8 * spread, compact);
    // Tiny camera approach on the type itself, then freeze before micro silence.
    tl.to([...text[5].title, ...text[5].paragraph], {
      scale: 1.025, duration: .65, ease: "sine.inOut"
    }, 76)
      .to([...text[5].title, ...text[5].paragraph], { scale: 1, duration: .65, ease: "sine.inOut" }, 76.65);
  }

  function brandReveal(tl, finale, logo, finalActions, chars, compact) {
    const stopMotion = [...finaleTitle.querySelector("span:not(.showcase-word):not(.showcase-sr-only)").querySelectorAll(".showcase-char")];
    const brand = chars.filter(char => !stopMotion.includes(char));
    tl.fromTo(finale.querySelector(".showcase-finale-pre"), {
      opacity: 0, y: 5, letterSpacing: ".38em"
    }, { opacity: 1, y: 0, letterSpacing: ".18em", duration: 1.4, ease: "power2.out", immediateRender: false }, 87.6)
      .fromTo(logo, { opacity: 0, scale: .55, z: compact ? -30 : -120, filter: compact ? "blur(3px)" : "blur(7px)" }, {
        opacity: 1, scale: 1, z: 0, filter: "blur(0px)", duration: 3.4, ease: "power3.out", immediateRender: false
      }, 88);
    reveal(tl, brand, { y: 12, z: compact ? -10 : -30 }, 89.5, .45, .85);
    reveal(tl, stopMotion, { y: compact ? 12 : 25, z: compact ? -15 : -50, rotationY: compact ? -25 : -60 }, 91.2, 1.25, .85);
    tl.fromTo(finale.querySelector(".showcase-positioning"), { opacity: 0, y: 12 }, {
      opacity: 1, y: 0, duration: 1.5, ease: "power2.out", immediateRender: false
    }, 93)
      .fromTo(finale.querySelector(".showcase-philosophy"), { opacity: 0, y: 8 }, {
        opacity: 1, y: 0, duration: 1.4, ease: "power2.out", immediateRender: false
      }, 94)
      .fromTo(finalActions, { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 1.5, ease: "power2.out", immediateRender: false
      }, 95.5);
  }

  function cleanupShowcase() {
    scrollController?.destroy();
    scrollController = null;
    timeline?.scrollTrigger?.kill();
    timeline?.kill();
    animationContext?.revert();
    timeline = animationContext = null;
    for (const [element, markup] of originalMarkup) element.innerHTML = markup;
    originalMarkup.clear();
    document.documentElement.classList.remove("showcase-enhanced");
    intro.querySelector(".showcase-copy-stack")?.style.removeProperty("--showcase-velocity");
    intro.querySelector(".showcase-finale")?.classList.remove("is-interactive");
    intro.querySelector(".showcase-final-actions")?.removeAttribute("inert");
    const header = document.querySelector(".site-header.showcase-header");
    header?.setAttribute("data-intro-state", "final");
    const brand = header?.querySelector("[data-showcase-brand]");
    if (brand) brand.textContent = "DA&A StopMotion";
  }

  function buildShowcase() {
    // Restore before translation/splitting, even when enhancement is unavailable.
    cleanupShowcase();
    applyShowcaseLanguage();
    if (reduceMotion.matches || !window.gsap || !window.ScrollTrigger) return;
    const stage = intro.querySelector(".showcase-stage");
    const scenes = [...intro.querySelectorAll(".showcase-copy")];
    const finale = intro.querySelector(".showcase-finale");
    const logo = intro.querySelector(".showcase-logo-wrap");
    const topline = intro.querySelector(".showcase-topline");
    const frameReadout = intro.querySelector("[data-showcase-frame]");
    const header = document.querySelector(".site-header.showcase-header");
    const headerBrand = header?.querySelector("[data-showcase-brand]");
    const finalActions = intro.querySelector(".showcase-final-actions");
    if (!stage || scenes.length !== 6 || !finale || !logo || !finalActions || !finaleTitle) return;
    const compact = compactMotion.matches;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("showcase-enhanced");

    // Context owns only this intro's inline styles/tweens; other sections keep their triggers.
    animationContext = gsap.context(() => {
      const text = scenes.map(scene => ({
        title: splitText(scene.querySelector("h1,h2")),
        paragraph: splitText(scene.querySelector("p"))
      }));
      const finalTitleChars = splitText(finaleTitle);
      gsap.set(stage, { backgroundColor: "#050608" });
      gsap.set(scenes, { opacity: 0, color: "#f3f3f5" });
      gsap.set(scenes[0], { opacity: 1 });
      gsap.set(text.flatMap(scene => [...scene.title, ...scene.paragraph]).concat(finalTitleChars), { opacity: 0 });
      gsap.set(topline, { color: "#b3badb" });
      gsap.set(frameReadout, { color: "#f3f3f5" });
      gsap.set(finale, { opacity: 0 });
      gsap.set([logo, finalActions, finale.querySelector(".showcase-finale-pre"),
        finale.querySelector(".showcase-positioning"), finale.querySelector(".showcase-philosophy")], { opacity: 0 });

      // Velocity belongs to a separate, tiny CSS transform on the type, never timeline time.
      const reaction = intro.querySelector(".showcase-copy-stack");
      const setReaction = gsap.quickSetter(reaction, "--showcase-velocity");
      const envelope = { amount: 0 };
      let influence = 0;
      const paintReaction = () => setReaction(influence * envelope.amount);
      function syncPresentation(tl) {
        const progress = tl.progress();
        const label = String(1 + Math.round(progress * 143)).padStart(3, "0");
        if (frameReadout) frameReadout.textContent = label;
        if (headerBrand) headerBrand.textContent = progress < .87 ? "FRAME / " + label : "DA&A StopMotion";
        header?.setAttribute("data-intro-state", progress < .87 ? "story" : "final");
        const interactive = progress >= .97;
        finale.classList.toggle("is-interactive", interactive);
        finalActions.toggleAttribute("inert", !interactive);
        paintReaction();
      }
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate() { syncPresentation(this); },
        scrollTrigger: {
          id: "homepage-typography",
          trigger: intro, start: "top top", end: "bottom bottom",
          scrub: .7, invalidateOnRefresh: true,
          onUpdate(self) {
            influence = compact ? 0 : gsap.utils.clamp(-1, 1, self.getVelocity() / 2500);
            paintReaction();
          },
          onScrubComplete() { influence = 0; paintReaction(); }
        }
      });
      timeline = tl;
      const regions = [0, 14, 28, 42, 56, 70];
      const labels = ["birth", "signal", "collision", "frame-rhythm", "chaos", "resolution"];
      regions.forEach((at, i) => {
        tl.addLabel(labels[i], at);
        if (i) tl.to(scenes[i], { opacity: 1, duration: .3 }, at);
        tl.to(scenes[i], { opacity: 0, duration: .65 }, i === 5 ? 87 : regions[i + 1] - .65);
        if (i !== 3) {
          tl.to(envelope, { amount: 1, duration: .5 }, at + .3)
            .to(envelope, { amount: 0, duration: .6 }, at + 6.4);
        }
      });
      tl.to(stage, { backgroundColor: "#11152e", duration: 22 }, 4)
        .to(stage, { backgroundColor: "#1f2251", duration: 20 }, 30)
        .to(stage, { backgroundColor: "#050608", duration: 17 }, 56)
        .addLabel("micro-silence", 81)
        .addLabel("brand-reveal", 87)
        .to(stage, { backgroundColor: "#f2efe7", duration: 2, ease: "power2.inOut" }, 87)
        .to(topline, { color: "#7a756b", duration: 2 }, 87)
        .to(frameReadout, { color: "#151512", duration: 2 }, 87)
        .to(finale, { opacity: 1, duration: .45 }, 87.5);
      animateSceneText(tl, text, compact);
      brandReveal(tl, finale, logo, finalActions, finalTitleChars, compact);
      // Fixed 0–100 extent includes a fully readable final hold.
      tl.to({}, { duration: 3 }, 97);
      syncPresentation(tl);
    }, intro);
    ScrollTrigger.refresh();
    // A rebuild/reload at mid-page must render the current scroll position immediately.
    timeline.progress(timeline.scrollTrigger.progress);
    scrollController = new IntroScrollController({ trigger: timeline.scrollTrigger });
    scrollController.enable();
  }

  function initShowcase() {
    bindLanguageSync();
    buildShowcase();
    reduceMotion.addEventListener("change", buildShowcase);
    compactMotion.addEventListener("change", buildShowcase);
    window.addEventListener("pageshow", event => { if (event.persisted) buildShowcase(); });
    window.addEventListener("pagehide", () => scrollController?.destroy());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShowcase, { once: true });
  } else {
    initShowcase();
  }
})();
