"use client";

import { useState, useEffect } from "react";
import styles from "./animateWord.module.css";

const WORDS = ["realidad", "impacto", "resultados", "experiencias", "futuro"];

export default function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Slide out
      setVisible(false);

      // 2. Cambiar palabra y slide in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setVisible(true);
      }, 400); // duración del exit animation

    }, 2000); // cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`${styles.word} ${visible ? styles.enter : styles.exit}`}
    >
      {WORDS[index]}
    </span>
  );
}