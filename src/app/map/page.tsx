"use client";
import styles from "./page.module.css";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { ChangeEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function RenderMap() {
  const map = useMap("main-map");

  const [searchText, setSearchText] = useState<string>("");

  function captureScreenshot() {
    console.log("Capturing screenshot");
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log("Searching...");
    setSearchText(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Map
        id="main-map"
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{
          lat: 12.998103721060815,
          lng: 77.59933959131116,
        }}
        defaultZoom={23}
        gestureHandling={"greedy"}
        mapTypeId={"satellite"}
        disableDefaultUI={true}
      />

      <button className={styles.nextButton} onClick={() => captureScreenshot()}>
        <span style={{ marginRight: "25px" }}>Next</span>
        <FaArrowRight className={styles.nextBoxIcon} />
      </button>
      <input
        value={searchText}
        onChange={(e) => handleSearch(e)}
        className={styles.searchBox}
        placeholder="search your location..."
      />
    </div>
  );
}
