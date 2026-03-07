import styles from "./Marquee.module.css";

const BRANDS = [
  "l2 twelve",
  "SOLEIL",
  "kooki",
  "GRAND Utilaje",
  "OPTIMO",
  "RecruiterOne",
];

export default function Marquee() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className={styles.brand}>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}