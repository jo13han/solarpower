"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

export function MapsAPIProvider({ children }: any) {
  return <APIProvider apiKey={"AIzaSyCi7e3FMADhQYOlwO0CjoAS4SeWGuhwXz8"}>{children}</APIProvider>;
}

//testing api key - AIzaSyCi7e3FMADhQYOlwO0CjoAS4SeWGuhwXz8
