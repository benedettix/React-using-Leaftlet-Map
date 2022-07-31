import React, { useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import teslaData from "./data/tesla-sites.json";

function App() {
  let [country, setCountry] = useState("Italy");
  const filteredStations = teslaData.filter(
    (tsla) => tsla.address.country.toLowerCase() === country.toLowerCase()
  );

  return (
    <>
      <div className="tesla">
        <p>
          SEARCH TESLA CHARGES BY <strong>COUNTRY</strong>
        </p>
      </div>

      <input
        onChange={(e) => setCountry(e.target.value)}
        type="text"
        placeholder={country}
        value={country}
      />

      <MapContainer
        center={[41.871941, 12.56738]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredStations.map((tsla) => {
          if (tsla.status === "OPEN") {
            var mystyle = {
              color: "green",
            };
          } else {
            var mystyle = {
              color: "red",
            };
          }
          return (
            <Marker
              key={tsla.id}
              position={[tsla.gps.latitude, tsla.gps.longitude]}
            >
              <Popup position={[tsla.gps.latitude, tsla.gps.longitude]}>
                <div>
                  <h2>{tsla.name}</h2>
                  <p style={mystyle}>{tsla.status}</p>
                  <p>{tsla.address.region}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}

export default App;
