"use client";
import { useAppDispatch, useAppSelector } from "@/components/reduxHooks";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { processImage } from "@/components/UISlice";
import axios from "axios";

export default function Results() {
  const screenshot = useAppSelector((state) => state.uislice.croppedScreenshot);
  const lat = useAppSelector((state) => state.uislice.lat);
  const lng = useAppSelector((state) => state.uislice.lng);
  const SI = useAppSelector((state) => state.uislice.currentSolar);
  const processedImg = useAppSelector((state) => state.uislice.processedImg);
  const [processedArea, setProcessedArea] = useState(null);
  const clippedImg = useAppSelector((state) => state.uislice.croppedScreenshot);
  const dispatch = useAppDispatch();
  const [finalImg, setFinalImg] = useState(null);
  const add = useAppSelector((state) => state.uislice.add);

  async function getImage() {
    let data = new FormData();
    let res = await fetch(clippedImg);
    let blobs = await res.blob();
    let imgFile = new File([blobs], "cropp", { type: "image/jpeg" });
    console.log(clippedImg);
    console.log("sendd");
    data.append("image", imgFile);
    console.log(data);
    axios
      .post("https://d0f4-103-169-236-165.ngrok-free.app/", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((response) => {
        console.log(response);
        //@ts-ignore
        setFinalImg("data:image/jpeg;base64," + response?.data?.image);
        //@ts-ignore
        setProcessedArea(response?.data?.area);
        console.log(response);
        return response;
      })
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftResults}>
        <img
          className={styles.original}
          src={
            clippedImg
              ? clippedImg
              : "https://media.discordapp.net/attachments/1154724255859216435/1226118431326339082/test.jpg?ex=66239ac6&is=661125c6&hm=0a221e8ea89543378a4c4cb7b17de75e0a4a97d3d54cd53664bfd3abc2e8c512&=&format=webp&width=198&height=322"
          }
          alt="ss"
        />

        {finalImg ? <img className={styles.new} src={finalImg} alt="sss" /> : null}
      </div>
      <div className={styles.rightResults}>
        <div className={styles.topRes}>
          <div className={styles.inner}>
            <div className={styles.innerTop}>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#363636",
                  borderRadius: "12px",
                  margin: "10px",
                }}
              >
                <span className={styles.title}>Solar Irradiance</span>
                <span className={styles.value}>{SI}(kwh/m2/day)</span>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#363636",
                  borderRadius: "12px",
                  margin: "10px",
                }}
              >
                <span className={styles.title}>Coordinates</span>
                <span style={{ marginLeft: "30px" }} className={styles.value}>
                  Latitude: {lat}, Longitude: {lng}
                </span>
              </div>
            </div>
            <div className={styles.innerBottom}>
              <div className={styles.title}>address</div>
              <div className={styles.value}>{add}</div>
            </div>
          </div>
        </div>
        <div className={styles.bottomRes}>
          <div className={styles.aboveContainer}>
            <div style={{ height: "80%" }} className={styles.innerTop}>
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#363636",
                  borderRadius: "12px",
                  margin: "10px",
                }}
              >
                <span className={styles.title}>Amount of co2 saved</span>
                <span className={styles.value}>
                  {processedArea ? 125 * 0.3 * SI * processedArea : "Loading..."} (g)
                </span>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#363636",
                  borderRadius: "12px",
                  margin: "10px",
                  height: "100%",
                }}
              >
                <span className={styles.title}>Area of panels</span>
                <span className={styles.value}>{processedArea ? processedArea : "Loading..."} (m2)</span>
              </div>
            </div>
          </div>
          <div className={styles.finalPower}>
            <div className={styles.finalInner}>
              <span style={{ fontWeight: "bolder", fontSize: "20px" }} className={styles.title}>
                Power Generated
              </span>
              <span style={{ fontWeight: "600", fontSize: "15px" }} className={styles.value}>
                {processedArea ? 0.3 * SI * processedArea : "Loading.."} (kwh)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
