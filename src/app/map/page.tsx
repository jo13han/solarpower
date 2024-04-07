"use client";
import AutocompleteCard from "@/components/autocompleteCard";
import styles from "./page.module.css";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import html2canvas from "html2canvas";
import { saveScreenshot, fetchSolar, saveCords, saveAdd, saveZoom } from "@/components/UISlice";
import { useAppDispatch, useAppSelector } from "@/components/reduxHooks";

export default function RenderMap() {
  const map = useMap("main-map");
  const placesLib = useMapsLibrary("places");

  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [hide, setHide] = useState<Boolean>(false);
  const [image, setImage] = useState<any>(null);

  const screenshotRef = useRef<any>(null);

  const solarEnergy = useAppSelector((state) => state.uislice.currentSolar);

  const dispatch = useAppDispatch();

  //using html2canvas to capture screenshot of the map
  function captureScreenshot() {
    console.log("capturing");
    dispatch(saveZoom(map?.getZoom()));
    console.log(map?.getZoom());
    //hide the ui
    setHide(true);
    //hiding the marker
    marker?.setMap(null);
    var canvasPromise = html2canvas(screenshotRef.current, {
      useCORS: true,
    });
    canvasPromise.then((canvas: any) => {
      var dataURL = canvas.toDataURL("image/png");
      // Create an image element from the data URL
      var img = new Image();
      img.src = dataURL;
      dispatch(saveScreenshot(img.src));
    });
    //enable the ui
    setHide(false);
    //re-enable marker
    marker?.setMap(map);
  }

  async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    //trigger autocomplete only after every 6 letters
    if (searchText.length % 2 == 0 && searchText != "" && placesLib && map) {
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
    dispatch(fetchSolar({ lat, lng }));
    dispatch(saveCords({ lat, lng }));
    dispatch(saveAdd(details.description));
    //close the search menu after selecting location
    setSearchText("");
  }

  return (
    <div className={styles.container}>
      <div ref={screenshotRef}>
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
          scaleControl={true}
        />
      </div>

      {!hide ? (
        <div>
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
          {solarEnergy && searchText == "" ? (
            <div className={styles.solarPot}>Solar Energy Today: {solarEnergy} (Kwh/m2/day)</div>
          ) : (
            <div className={styles.guidenceContainer}>Search your home and zoom over the roof</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
