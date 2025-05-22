import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";

const bezirksKoordinaten = [
  [52.525, 13.405],   // Beispielkoordinaten (LatLng)
  [52.526, 13.406],
  [52.525, 13.407],
  [52.524, 13.406],
];

export default function MapView() {
  return (
    <MapContainer center={[52.525, 13.405]} zoom={15} style={{ height: "90vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />
      <Polygon positions={bezirksKoordinaten}>
        <Popup>Wahlbezirk 42</Popup>
      </Polygon>
    </MapContainer>
  );
}
