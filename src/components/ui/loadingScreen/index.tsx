"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingScreen.module.css";

type Props = {
  isVisible: boolean;
};

export default function LoadingScreen({ isVisible }: Props) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.img
            src="/logos/logo-gris.svg"
            alt="Certezza"
            className={styles.logo}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}