import { getLenis } from "./lenisInstance";

export function scrollToSection(targetId: string) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const headerElement = document.querySelector(".header") as HTMLElement | null;
  const headerHeight = headerElement ? headerElement.offsetHeight : 80;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(targetElement, { offset: -headerHeight, duration: 1.2 });
    return;
  }

  const targetPosition =
    targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}
