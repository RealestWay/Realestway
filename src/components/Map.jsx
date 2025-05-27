import { useRef, useEffect } from "react";

// Replace with your actual Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyD845dpQ62RHqNW83JcyA5YKaRQ05UVl8I";

const loadGoogleMapsScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
};

const Map = ({ house }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const mapPosition = {
    lat: house.location.latitude, // Google Maps uses (lat, lng), make sure this is not swapped
    lng: house.location.longitude,
  };

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (map.current) return;

      map.current = new window.google.maps.Map(mapContainer.current, {
        center: mapPosition,
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: mapPosition,
        map: map.current,
      });
    });
  }, [mapPosition.lat, mapPosition.lng]);

  return (
    <div className="w-full h-[450px] relative">
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
};

export default Map;
