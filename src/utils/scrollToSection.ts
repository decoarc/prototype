export function scrollToSection(targetId: string) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const headerElement = document.querySelector(".header") as HTMLElement | null;
  const headerHeight = headerElement ? headerElement.offsetHeight : 80;

  const targetPosition =
    targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}
