import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function MapView() {
  const [wahlen, setWahlen] = useState([]);
  const [ausgewaehlt, setAusgewaehlt] = useState('');
  const [bezirke, setBezirke] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch('http://45.92.217.114:8000/wahl/')
      .then(res => res.json())
      .then(setWahlen)
      .catch(err => console.error("Fehler beim Laden der Wahlen:", err));
  }, []);

  useEffect(() => {
    fetch('http://45.92.217.114:8000/wahlbezirke/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.features)) {
          setBezirke(data.features);
        } else {
          console.error("Unerwartete Datenstruktur:", data);
        }
      })
      .catch(err => console.error("Fehler beim Laden der Bezirke:", err));
  }, []);

  const handleChange = (event) => {
    setAusgewaehlt(event.target.value);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        console.log("Bezirk geklickt:", feature.properties);
        layer.setStyle({ fillColor: 'red' });
      },
      mouseover: (e) => {
        e.target.setStyle({ weight: 3, color: '#666' });
      },
      mouseout: (e) => {
        e.target.setStyle({ weight: 1, color: '#3388ff' });
      }
    });
  };

  return (
    <div className="relative h-screen w-screen">
      <label htmlFor="wahl-select">Wahl auswählen</label>
      <select id="wahl-select" value={ausgewaehlt} onChange={handleChange}>
        <option value=""> -- Bitte wählen --</option>
        {wahlen.map(wahl => (
          <option key={wahl.id} value={wahl.id}>
            {wahl.bezeichnung}
          </option>
        ))}
      </select>

      <MapContainer center={[52.52, 13.405]} zoom={11} style={{ height: "100vh", width: "100vw" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        />

        <GeoJSON
  data={{ type: "FeatureCollection", features: bezirke }}
  style={() => ({
    color: "blue",         // Randfarbe
    weight: 2,
    fillColor: "rgba(0, 0, 255, 0.3)",
    fillOpacity: 0.5
  })}
  onEachFeature={onEachFeature}
/>

      </MapContainer>
    </div>
  );
}
