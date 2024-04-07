"use client";
import { useAppDispatch, useAppSelector } from "@/components/reduxHooks";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { saveProcessed, setWaterData } from "@/components/UISlice";

export default function Results() {
  const screenshot = useAppSelector((state) => state.uislice.currentScreenshot);
  const lat = useAppSelector((state) => state.uislice.lat);
  const lng = useAppSelector((state) => state.uislice.lng);
  const SI = useAppSelector((state) => state.uislice.currentSolar);
  const processedImg = useAppSelector((state) => state.uislice.processedImg);
  const [processedArea, setProcessedArea] = useState<any>(null);
  const clippedImg = useAppSelector((state) => state.uislice.croppedScreenshot);
  const [finalImg, setFinalImg] = useState(null);
  const add = useAppSelector((state) => state.uislice.add);
  const zoomLevel = useAppSelector((state) => state.uislice.zoomLevel);
  const waterHarvesting = useAppSelector((state) => state.uislice.waterHarvesting);
  const waterData = useAppSelector((state) => state.uislice.waterData);

  const dispatch = useAppDispatch();

  async function getWaterImage() {
    let data = new FormData();
    let res = await fetch(clippedImg);
    let blobs = await res.blob();
    let imgFile = new File([blobs], "cropp", { type: "image/jpeg" });
    data.append("image", imgFile);
    data.append("zoomLevel", `${zoomLevel}`);
    data.append("lat", `${lat}`);
    data.append("long", `${lng}`);
    axios
      .post("https://d0f4-103-169-236-165.ngrok-free.app/rainwater", data, {
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
        dispatch(setWaterData(response.data));
        dispatch(saveProcessed({ processedArea: response?.data?.area, processedImg: response?.data?.image }));
        return response;
      })
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }

  async function getSolarImage() {
    let data = new FormData();
    let res = await fetch(clippedImg);
    let blobs = await res.blob();
    let imgFile = new File([blobs], "cropp", { type: "image/jpeg" });
    data.append("image", imgFile);
    data.append("zoomLevel", `${zoomLevel}`);
    data.append("lat", `${lat}`);
    axios
      .post("https://d0f4-103-169-236-165.ngrok-free.app/solar", data, {
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
        dispatch(saveProcessed({ processedArea: response?.data?.area, processedImg: response?.data?.image }));
        return response;
      })
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }

  useEffect(() => {
    if (waterHarvesting) {
      getWaterImage();
    } else {
      getSolarImage();
    }
  }, []);

  return (
    <div className={styles.container}>
      {processedArea && processedImg && !waterHarvesting ? (
        <Link href={"/calculate"}>
          <button className={styles.nextButton}>
            <span style={{ marginRight: "25px" }}>Next</span>
            <FaArrowRight className={styles.nextBoxIcon} />
          </button>
        </Link>
      ) : null}
      <img className={styles.bgimg} src={screenshot} alt="ddd" />
      <div className={styles.innerContainer}>
        <div className={styles.leftResults}>
          <div className={styles.imageBox}>
            <span className={styles.title}>Original</span>
            <img
              className={styles.original}
              src={
                clippedImg
                  ? clippedImg
                  : "https://media.discordapp.net/attachments/1154724255859216435/1226118431326339082/test.jpg?ex=66239ac6&is=661125c6&hm=0a221e8ea89543378a4c4cb7b17de75e0a4a97d3d54cd53664bfd3abc2e8c512&=&format=webp&width=198&height=322"
              }
              alt="ss"
            />
          </div>

          <div className={styles.imageBox}>
            <span className={styles.title}>Generating</span>
            {finalImg ? <img className={styles.new} src={finalImg} alt="sss" /> : <span>Loading...</span>}
          </div>
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
                  <span className={styles.title}>{waterData ? "Liters Consumed" : "Solar Irradiance"}</span>
                  <span className={styles.value}>
                    {waterHarvesting ? `${waterData?.litres_consumed} (l)` : `${SI?.toFixed(2)} (kwh/m2/day)`}
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
                  }}
                >
                  <span className={styles.title}>Coordinates</span>
                  <span style={{ marginLeft: "30px" }} className={styles.value}>
                    Latitude: {lat}, Longitude: {lng}
                  </span>
                </div>
              </div>
              <div className={styles.innerBottom}>
                <div className={styles.title}>Address</div>
                <div style={{ marginLeft: "20px" }} className={styles.value}>
                  {add}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottomRes}>
            <div className={styles.aboveContainer}>
              <div style={{ height: "80%" }} className={styles.innerTop}>
                {waterHarvesting ? null : (
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
                      {processedArea ? (125 * 0.3 * SI * processedArea).toFixed(2) : "Loading..."} (g)
                    </span>
                  </div>
                )}
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
                  <span className={styles.title}>{waterHarvesting ? "Roof Area" : "Panel Area"}</span>
                  {waterHarvesting ? (
                    <span className={styles.value}>{waterData ? waterData?.area : "Loading..."} (m2)</span>
                  ) : (
                    <span className={styles.value}>
                      {processedArea ? processedArea?.toFixed(2) : "Loading..."} (m2)
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.finalPower}>
              <div className={styles.finalInner}>
                <span style={{ fontWeight: "bolder", fontSize: "20px" }} className={styles.title}>
                  {waterHarvesting ? "Rain water harvested" : "Power Generated"}
                </span>
                {waterHarvesting ? (
                  <span style={{ fontWeight: "600", fontSize: "15px" }} className={styles.value}>
                    {processedArea ? waterData?.rain_water_harvested?.toFixed(2) : "Loading.."} (l)
                  </span>
                ) : (
                  <span style={{ fontWeight: "600", fontSize: "15px" }} className={styles.value}>
                    {processedArea ? (0.3 * SI * processedArea).toFixed(2) : "Loading.."} (kwh)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
