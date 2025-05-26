import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const Map = ({ house }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapPosition = {
    lng: house.location.latitude,
    lat: house.location.longitude,
  };
  const zoom = 14;
  maptilersdk.config.apiKey = "db1GuYKSNana8ImwaTk4";

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [mapPosition.lng, mapPosition.lat],
      zoom: zoom,
    });
  }, [mapPosition.lng, mapPosition.lat, zoom]);

  return (
    <div className="w-full h-[450px] relative">
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
};

export default Map;
