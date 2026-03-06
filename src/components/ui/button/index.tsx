type ButtonsProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonsProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
