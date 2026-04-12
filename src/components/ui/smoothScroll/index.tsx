"use client";

import { useEffect } from "react";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateTo(container: HTMLElement, target: number, duration: number) {
  const start = container.scrollTop;
  const distance = target - start;
  let startTime: number | null = null;

  function step(now: number) {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    container.scrollTop = start + distance * easeInOutCubic(progress);
    if (elapsed < duration) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.innerWidth < 1023) return;

    const container = document.getElementById("snap-container");
    if (!container) return;

    let isScrolling = false;

    function getSections(): HTMLElement[] {
      return Array.from(
        document.querySelectorAll<HTMLElement>("#snap-container main > section, #snap-container footer")
      );
    }

    function getCurrentIndex(sections: HTMLElement[]): number {
      const scrollMid = container!.scrollTop + container!.clientHeight / 2;
      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollMid) current = i;
      }
      return current;
    }

    function getTargetTop(el: HTMLElement): number {
      // offsetTop relativo al snap-container
      let top = 0;
      let node: HTMLElement | null = el;
      while (node && node !== container) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (isScrolling) return;

      const sections = getSections();
      const currentIndex = getCurrentIndex(sections);
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));

      if (nextIndex === currentIndex) return;

      isScrolling = true;
      animateTo(container!, getTargetTop(sections[nextIndex]), 900);
      setTimeout(() => { isScrolling = false; }, 950);
    }

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => { container.removeEventListener("wheel", onWheel); };
  }, []);

  return null;
}
