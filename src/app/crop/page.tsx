"use client";
import styles from "./page.module.css";
import ReactLassoSelect, { getCanvas } from "react-lasso-select";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
export default function Crop() {
  const [clippedImg, setClippedImg] = useState();
  //get rid of this later by adding check for screenshot and loading screen
  const screenshot =
    "https://media.discordapp.net/attachments/979277341723332638/1223887944738275389/image.png?ex=661b7d78&is=66090878&hm=3c0842acb7ed09287473acf9f1c8142fb986c4db78d2252559a764f80ea0d764&=&format=webp&quality=lossless&width=1200&height=481";
  useEffect(() => {
    if (!screenshot) window.location.href = "/map";
  }, [screenshot]);
  return (
    <>
      {screenshot ? (
        <div className={styles.container}>
          <div className={styles.screenshotContainer}>
            <ReactLassoSelect
              style={{ borderRadius: "15px" }}
              src={screenshot}
              onComplete={(value: any) => {
                if (!value.length) return;
                getCanvas(screenshot, value, (err: any, canvas: any) => {
                  if (!err) {
                    setClippedImg(canvas.toDataURL());
                  }
                });
              }}
            />
          </div>
          <div>
            <img src={clippedImg} alt="" />
          </div>
          <>
            <div className={styles.guidenceContainer}>Please mark points over the roof to select</div>
            <div className={styles.buttonContainer}>
              <button onClick={() => setClippedImg(undefined)} className={styles.clearButton}>
                <span style={{ marginLeft: "10px" }}>Clear</span>
                <MdDeleteOutline className={styles.clearBoxIcon} />
              </button>
              <button className={styles.nextButton}>
                <span style={{ marginRight: "25px" }}>Next</span>
                <FaArrowRight className={styles.nextBoxIcon} />
              </button>
            </div>
            <div className={styles.ball1}>&nbsp;&nbsp;</div>
            <div className={styles.ball2}>&nbsp;&nbsp;</div>
            <div className={styles.ball3}>&nbsp;&nbsp;</div>
            <div className={styles.ball4}>&nbsp;&nbsp;</div>
          </>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}