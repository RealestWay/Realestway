import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const APIKEY = "AIzaSyA6ofRSHEr67fGX2vFisaUk5r8xr9T08qY";
const Map = ({ house }) => {
  const mapPosition = [house.location.latitude, house.location.longitude];
  // const mapContainerStyle = {
  //   width: "100%",
  //   height: "400px",
  // };

  return (
    <div className="w-full h-[450px] overflow-hidden">
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>Housee location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
  //   return (
  //     <LoadScript googleMapsApiKey="AIzaSyA6ofRSHEr67fGX2vFisaUk5r8xr9T08qY">
  //       <GoogleMap
  //         mapContainerStyle={mapContainerStyle}
  //         center={mapPosition}
  //         zoom={12}
  //       >
  //         <Marker position={mapPosition} />
  //       </GoogleMap>
  //     </LoadScript>
  //   );
};

export default Map;
