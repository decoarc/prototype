import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis) {
  lenisInstance = instance;
}

export function clearLenis() {
  lenisInstance = null;
}

export function getLenis() {
  return lenisInstance;
}
