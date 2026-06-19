import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, clearLenis } from "../utils/lenisInstance";

gsap.registerPlugin(ScrollTrigger);

export function useScrollEffects() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lenis: Lenis | null = null;
    let tickerUpdate: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);

      tickerUpdate = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerUpdate);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-scroll-stagger]")
        .forEach((container) => {
          const items = container.querySelectorAll(".scroll-reveal-item");
          if (!items.length) return;

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

      const hero = document.querySelector(".hero");
      if (hero) {
        gsap.to(".hero-inner", {
          y: -90,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        gsap.to(".hero-glow", {
          y: -50,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      const progressBar = document.querySelector(".scroll-progress-bar");
      if (progressBar) {
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            gsap.set(progressBar, { scaleX: self.progress });
          },
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      if (tickerUpdate) {
        gsap.ticker.remove(tickerUpdate);
      }
      if (lenis) {
        clearLenis();
        lenis.destroy();
      }
    };
  }, []);
}
