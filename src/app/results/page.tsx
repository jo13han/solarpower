"use client";
import { useAppSelector } from "@/components/reduxHooks";
import styles from "./page.module.css";

export default function Results() {
  const screenshot = useAppSelector((state) => state.uislice.croppedScreenshot);

  return (
    <div className={styles.container}>
      <div className={styles.leftResults}>
        <img
          className={styles.original}
          src={
            "https://media.discordapp.net/attachments/1154724255859216435/1226118431326339082/test.jpg?ex=66239ac6&is=661125c6&hm=0a221e8ea89543378a4c4cb7b17de75e0a4a97d3d54cd53664bfd3abc2e8c512&=&format=webp&width=198&height=322"
          }
          alt="ss"
        />

        <img
          className={styles.new}
          src={
            "https://media.discordapp.net/attachments/1154724255859216435/1223218796249092156/panels_final.png?ex=662248c7&is=660fd3c7&hm=15618c0afdad229207b21f407894ddabc5189a3d215539965c15af21f09ba329&=&format=webp&quality=lossless&width=736&height=552"
          }
          alt="sss"
        />
      </div>
      <div className={styles.rightResults}>
        <div className={styles.topRes}>
          <div className={styles.inner}>res</div>
        </div>
        <div className={styles.bottomRes}>
          <div className={styles.aboveContainer}>
            <div>area</div>
            <div>solar area</div>
          </div>
          <div className={styles.finalPower}>final</div>
        </div>
      </div>
    </div>
  );
}
