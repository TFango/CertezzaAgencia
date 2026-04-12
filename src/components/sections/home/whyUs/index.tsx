import WhyUsMobile from "./WhyUsMobile";
import WhyUsDesktop from "./WhyUsDesktop";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  return (
    <>
      <div className={styles.showMobile}>
        <WhyUsMobile />
      </div>
      <div className={styles.showDesktop}>
        <WhyUsDesktop />
      </div>
    </>
  );
}
