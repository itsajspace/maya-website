import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function revealIn(targets, vars = {}, position) {
  return {
    targets,
    from: { y: vars.y ?? 24, opacity: 0, ...(vars.from || {}) },
    to: {
      y: 0,
      opacity: 1,
      duration: vars.duration ?? 0.6,
      stagger: vars.stagger ?? 0,
      ease: vars.ease ?? "power3.out",
      immediateRender: false,
      clearProps: vars.clearProps,
    },
    position,
  };
}

function initHero() {
  const letters = document.querySelectorAll(".brand-letter");
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // CTAs stay fully visible — never animate opacity (prior GSAP bug left them at 0)
  gsap.set(".cta-row .cta", { clearProps: "opacity,visibility,transform", opacity: 1, y: 0 });

  const steps = [
    revealIn(".site-header", { y: -16, duration: 0.65 }),
    revealIn(".status", { y: 14, duration: 0.45 }, "-=0.35"),
    {
      targets: letters,
      from: {
        y: 80,
        opacity: 0,
        rotateX: -40,
        filter: "blur(12px)",
        transformOrigin: "50% 100%",
      },
      to: {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.95,
        stagger: 0.06,
        ease: "power3.out",
        immediateRender: false,
      },
      position: "-=0.25",
    },
    revealIn(".headline", { y: 20, duration: 0.55 }, "-=0.5"),
    revealIn(".support", { y: 16, duration: 0.5 }, "-=0.35"),
    revealIn(".cta-row .cta", {
      y: 10,
      duration: 0.4,
      stagger: 0.08,
      from: { opacity: 1 },
      clearProps: "transform",
    }, "-=0.28"),
    revealIn(".store-note", { y: 10, duration: 0.4 }, "-=0.25"),
    {
      targets: ".phone-hero",
      from: { y: 60, opacity: 0, rotate: 5 },
      to: {
        y: 0,
        opacity: 1,
        rotate: -1.5,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
      },
      position: "-=0.75",
    },
    revealIn(".phone-hero .bubble, .phone-hero .action-card", {
      y: 14,
      duration: 0.4,
      stagger: 0.1,
    }, "-=0.35"),
    {
      targets: ".hero-bg img",
      from: { scale: 1.12 },
      to: {
        scale: 1.05,
        duration: 1.4,
        ease: "power2.out",
        immediateRender: false,
      },
      position: 0,
    },
  ];

  steps.forEach((step) => {
    tl.fromTo(step.targets, step.from, step.to, step.position);
  });
}

function initIndiaCinematic() {
  const section = document.querySelector(".india");
  if (!section) return;

  const lines = gsap.utils.toArray(".india-line");
  const chars = gsap.utils.toArray(".india-char");
  const meta = document.querySelector(".india-meta");
  const marquee = document.querySelector(".india-marquee");

  gsap.set(chars, {
    yPercent: 140,
    opacity: 0,
    transformOrigin: "50% 100%",
  });
  gsap.set(meta, { opacity: 0, y: 24 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 0.9,
      anticipatePin: 1,
    },
  });

  tl.to(chars, {
    yPercent: 0,
    opacity: 1,
    duration: 0.9,
    stagger: { each: 0.035, from: "start" },
    ease: "power4.out",
  });

  tl.to(lines[0], { xPercent: -8, duration: 1.2, ease: "none" }, 0.45);
  tl.to(lines[1], { xPercent: 12, duration: 1.2, ease: "none" }, 0.45);
  tl.to(lines[2], { xPercent: -6, duration: 1.2, ease: "none" }, 0.45);

  tl.to(
    meta,
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
    },
    0.65,
  );

  tl.fromTo(
    marquee,
    { scale: 1 },
    { scale: 1.04, duration: 1, ease: "none" },
    0.55,
  );

  tl.to(
    [marquee, meta],
    {
      opacity: 0,
      y: -50,
      duration: 0.55,
      ease: "power2.in",
    },
    1.55,
  );
}

function initChatDemo() {
  const msgs = gsap.utils.toArray(".chat-thread-demo .demo-msg");
  if (!msgs.length) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".promise",
      start: "top 65%",
      toggleActions: "play none none none",
    },
  });

  msgs.forEach((msg, i) => {
    tl.fromTo(
      msg,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        immediateRender: false,
      },
      i * 0.32,
    );
  });
}

function initScroll() {
  const reveal = (targets, trigger, vars = {}) => {
    gsap.fromTo(
      targets,
      { y: vars.y ?? 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: vars.duration ?? 0.7,
        stagger: vars.stagger ?? 0,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger,
          start: vars.start ?? "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  };

  reveal(".examples .section-kicker, .examples .section-title", ".examples", { stagger: 0.1 });
  reveal(".example-pill", ".examples", { y: 18, stagger: 0.04, duration: 0.5, start: "top 78%" });
  reveal(".promise-copy > *", ".promise", { stagger: 0.1, start: "top 78%" });
  reveal(".phone-compact", ".promise", { y: 40, duration: 0.9, start: "top 72%" });
  reveal(".life .section-kicker, .life .section-title", ".life", { stagger: 0.1 });
  reveal(".cap-row", ".life", { y: 24, stagger: 0.08, start: "top 75%" });
  reveal(".building-inner > *", ".building", { stagger: 0.1 });
  reveal(".backed-inner > *", ".backed", { stagger: 0.1 });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function initPhotoParallax() {
  gsap.utils.toArray(".hero-bg img, .section-photo img").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest("section"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

if (!reduceMotion) {
  initHero();
  initIndiaCinematic();
  initChatDemo();
  initScroll();
  initPhotoParallax();
} else {
  gsap.set(
    [
      ".site-header",
      ".status",
      ".brand-letter",
      ".headline",
      ".support",
      ".cta",
      ".store-note",
      ".phone-hero",
      ".bubble",
      ".action-card",
      ".hero-bg",
      ".india-char",
      ".india-meta",
      ".example-pill",
      ".promise-copy > *",
      ".phone-compact",
      ".demo-msg",
      ".cap-row",
      ".building-inner > *",
      ".backed-inner > *",
    ],
    { clearProps: "all", opacity: 1 },
  );
}
