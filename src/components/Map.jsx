// import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ house }) => {
  const mapPosition = [house.location.lat, house.location.lng];

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
};

export default Map;
