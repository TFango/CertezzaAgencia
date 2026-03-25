"use client";

import { useEffect, useRef } from "react";
import styles from "./Marquee.module.css";

const BRANDS = [
  "CapdevilaSoldadura",

];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const animate = () => {
      const halfWidth = track.scrollWidth / 2;

      posRef.current -= speed;

      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current = 0;
      }

      track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.marquee}>
        <div ref={trackRef} className={styles.track}>
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.brand}>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
