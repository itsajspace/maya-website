import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./style.css";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function loadGsap() {
  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  return { gsap, ScrollTrigger };
}

/**
 * Slow cinematic load-in, then scroll takes over.
 * `.hero-in` is applied only after intro so clearProps can't hide the hero.
 */
function initHero(gsap) {
  const header = document.querySelector(".site-header");
  const status = document.querySelector(".hero-copy .status");
  const letters = gsap.utils.toArray(".brand-letter");
  const headline = document.querySelector(".hero-copy .headline");
  const support = document.querySelector(".hero-copy .support");
  const ctas = gsap.utils.toArray(".cta-row .cta");
  const store = document.querySelector(".hero-copy .store-note");
  const phone = document.querySelector(".phone-hero");
  const phoneBits = gsap.utils.toArray(
    ".phone-hero .bubble, .phone-hero .action-card, .phone-hero .chat-top, .phone-hero .chat-composer",
  );
  const bg = document.querySelector(".hero-bg img");
  const hero = document.querySelector(".hero");
  const copy = document.querySelector(".hero-copy");

  const finish = () => {
    document.documentElement.classList.add("hero-in");
    gsap.set(
      [header, status, ...letters, headline, support, ...ctas, store, phone, ...phoneBits],
      { clearProps: "opacity,filter" },
    );
  };

  if (!header || !phone || !hero) {
    finish();
    return;
  }

  gsap.set([header, status, ...letters, headline, support, ...ctas, store, phone, ...phoneBits], {
    opacity: 0,
  });
  gsap.set([status, headline, support, store], { y: 28 });
  gsap.set(letters, { y: 56 });
  gsap.set(ctas, { y: 20 });
  gsap.set(phone, { y: 48 });
  gsap.set(phoneBits, { y: 16 });
  if (bg) gsap.set(bg, { scale: 1.12 });

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    onComplete: finish,
  });

  if (bg) {
    tl.to(bg, { scale: 1, duration: 3.2, ease: "power1.out" }, 0);
  }

  tl.to(header, { opacity: 1, duration: 1.1 }, 0.15);
  tl.to(status, { opacity: 1, y: 0, duration: 0.9 }, 0.35);
  tl.to(
    letters,
    {
      opacity: 1,
      y: 0,
      duration: 1.25,
      stagger: 0.09,
      ease: "power3.out",
    },
    0.55,
  );
  tl.to(headline, { opacity: 1, y: 0, duration: 1 }, 0.95);
  tl.to(support, { opacity: 1, y: 0, duration: 1 }, 1.15);
  tl.to(ctas, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 }, 1.35);
  tl.to(store, { opacity: 1, y: 0, duration: 0.8 }, 1.55);
  tl.to(phone, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, 0.75);
  tl.to(
    phoneBits,
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.12,
    },
    1.35,
  );

  // Scroll-linked hero drift — tied to scroll, smoothed with scrub lag
  gsap.to(copy, {
    y: -80,
    opacity: 0.35,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  gsap.to(phone, {
    y: 120,
    rotate: 2,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  if (bg) {
    gsap.to(bg, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1.4,
      },
    });
  }
}

function initIndiaCinematic(gsap) {
  const section = document.querySelector(".india");
  if (!section) return;

  const lines = gsap.utils.toArray(".india-line");
  const chars = gsap.utils.toArray(".india-char");
  const meta = document.querySelector(".india-meta");
  const marquee = document.querySelector(".india-marquee");

  gsap.set(chars, { yPercent: 130, opacity: 0 });
  gsap.set(meta, { opacity: 0, y: 28 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=280%",
      pin: true,
      scrub: 1.25,
      anticipatePin: 0,
    },
  });

  tl.to(chars, {
    yPercent: 0,
    opacity: 1,
    duration: 1.4,
    stagger: { each: 0.045, from: "start" },
    ease: "none",
  });

  tl.to(lines[0], { xPercent: -10, duration: 1.6, ease: "none" }, 0.5);
  tl.to(lines[1], { xPercent: 12, duration: 1.6, ease: "none" }, 0.5);
  tl.to(lines[2], { xPercent: -7, duration: 1.6, ease: "none" }, 0.5);

  tl.to(meta, { opacity: 1, y: 0, duration: 0.7, ease: "none" }, 0.85);
  tl.to(marquee, { scale: 1.05, duration: 1.5, ease: "none" }, 0.7);
  tl.to([marquee, meta], { opacity: 0, y: -50, duration: 0.8, ease: "none" }, 2);
}

function initChatDemo(gsap) {
  const msgs = gsap.utils.toArray(".chat-thread-demo .demo-msg");
  if (!msgs.length) return;

  gsap.fromTo(
    msgs,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      ease: "none",
      stagger: 0.2,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".promise",
        start: "top 75%",
        end: "top 25%",
        scrub: 1.1,
      },
    },
  );
}

function initScroll(gsap) {
  const scrubReveal = (targets, trigger, vars = {}) => {
    gsap.fromTo(
      targets,
      { y: vars.y ?? 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        stagger: vars.stagger ?? 0,
        immediateRender: false,
        scrollTrigger: {
          trigger,
          start: vars.start ?? "top 90%",
          end: vars.end ?? "top 45%",
          scrub: vars.scrub ?? 1.15,
        },
      },
    );
  };

  scrubReveal(".examples .section-kicker, .examples .section-title", ".examples", {
    stagger: 0.12,
  });
  scrubReveal(".example-pill", ".examples", {
    y: 32,
    stagger: 0.05,
    start: "top 88%",
    end: "top 50%",
  });
  scrubReveal(".promise-copy > *", ".promise", {
    stagger: 0.12,
    start: "top 85%",
    end: "top 40%",
  });
  scrubReveal(".phone-compact", ".promise", {
    y: 64,
    start: "top 80%",
    end: "top 35%",
    scrub: 1.3,
  });
  scrubReveal(".life .section-kicker, .life .section-title", ".life", {
    stagger: 0.12,
  });
  scrubReveal(".cap-row", ".life", {
    y: 40,
    stagger: 0.1,
    start: "top 88%",
    end: "top 48%",
  });
  scrubReveal(".building-inner > *", ".building", {
    stagger: 0.14,
    start: "top 88%",
    end: "top 42%",
    scrub: 1.25,
  });
  scrubReveal(".backed-inner > *", ".backed", {
    stagger: 0.14,
    start: "top 88%",
    end: "top 42%",
    scrub: 1.25,
  });
}

function initPhotoParallax(gsap) {
  gsap.utils.toArray(".section-photo img").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest("section"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      },
    );
  });
}

function whenNear(el, rootMargin, fn) {
  if (!el) {
    fn();
    return;
  }
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    fn();
  };
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        run();
      }
    },
    { rootMargin },
  );
  io.observe(el);
}

async function boot() {
  if (reduceMotion) {
    document.documentElement.classList.add("hero-in");
    return;
  }

  document.documentElement.classList.add("anim");

  // Failsafe for slower intro
  window.setTimeout(() => {
    document.documentElement.classList.add("hero-in");
  }, 6000);

  const { gsap } = await loadGsap();

  initHero(gsap);

  whenNear(document.querySelector("#india"), "35% 0px", () => {
    initIndiaCinematic(gsap);
    initChatDemo(gsap);
    initScroll(gsap);
    initPhotoParallax(gsap);
  });
}

boot();
