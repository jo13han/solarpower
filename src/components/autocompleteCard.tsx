import styles from "./card.module.css";
import { IoHome } from "react-icons/io5";

export default function AutocompleteCard({
  getLocation,
  autocomp,
}: {
  getLocation: any;
  autocomp: google.maps.places.AutocompletePrediction;
}) {
  return (
    <div onClick={() => getLocation(autocomp)} className={styles.card}>
      <div className={styles.icon}>
        <IoHome />
      </div>
      <div className={styles.details}>
        <span className={styles.title}>{autocomp.structured_formatting.main_text}</span>
        <span className={styles.add}>{autocomp.description}</span>
      </div>
    </div>
  );
}
