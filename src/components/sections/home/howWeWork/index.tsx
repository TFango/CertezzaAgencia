import HowWeWorkMobile from "./HowWeWorkMobile";
import HowWeWorkDesktop from "./HowWeWorkDesktop";
import styles from "./HowWeWork.module.css";

export default function HowWeWork() {
  return (
    <>
      <div className={styles.showMobile}>
        <HowWeWorkMobile />
      </div>
      <div className={styles.showDesktop}>
        <HowWeWorkDesktop />
      </div>
    </>
  );
}
