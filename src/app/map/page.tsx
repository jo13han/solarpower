"use client";
import AutocompleteCard from "@/components/autocompleteCard";
import styles from "./page.module.css";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function RenderMap() {
  const map = useMap("main-map");
  const placesLib = useMapsLibrary("places");

  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  function captureScreenshot() {
    console.log("Capturing screenshot");
  }

  async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    //trigger autocomplete only after every 6 letters
    if (searchText.length % 6 == 0 && searchText != "" && placesLib && map) {
      const autocomplete = new placesLib.AutocompleteService();
      let autoResults = await autocomplete.getPlacePredictions({ input: searchText });
      console.log("trigger autocomplete");
      console.log("Autocomplete results ", autoResults);
      //add autocomplete results to the state array and reverse to get the closest prediction on top (because using column reverse)
      setResults(autoResults.predictions.reverse());
    }
  }

  async function getLocation(details: google.maps.places.AutocompletePrediction) {
    console.log("Selected Location Details ", details);
    const gc = new google.maps.Geocoder();
    //geocoding using placeId to get the latitude and longitude
    const location = await gc.geocode({ placeId: details?.place_id });
    console.log("Location after Geocoding ", location);
    //pan to the selected location using latlng
    map?.panTo({
      lat: location?.results[0]?.geometry?.location?.lat(),
      lng: location?.results[0]?.geometry?.location?.lng(),
    });
    //set a marker at the point
    const marker = new google.maps.Marker({
      position: {
        lat: location?.results[0]?.geometry?.location?.lat(),
        lng: location?.results[0]?.geometry?.location?.lng(),
      },
      map,
      title: "location",
    });
    const lat = location?.results[0]?.geometry?.location?.lat();
    const lng = location?.results[0]?.geometry?.location?.lng();
    setMarker(marker);
    //@ts-ignore
    //close the search menu after selecting location
    setSearchText("");
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

      <Link href={"/crop"}>
        <button className={styles.nextButton} onClick={() => captureScreenshot()}>
          <span style={{ marginRight: "25px" }}>Next</span>
          <FaArrowRight className={styles.nextBoxIcon} />
        </button>
      </Link>
      <div className={styles.searchArea}>
        <div className={styles.inputContainer}>
          <input
            value={searchText}
            onChange={(e) => handleSearch(e)}
            className={styles.searchBox}
            placeholder="Search your house.."
          />
          <FaSearch className={styles.searchBoxIcon} />
        </div>
        {searchText != "" ? (
          <div className={styles.results}>
            {results?.map((result: any) => (
              <AutocompleteCard
                key={result.place_id}
                autocomp={result}
                getLocation={(details: google.maps.places.AutocompletePrediction) => getLocation(details)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
