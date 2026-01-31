import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ✅ import your JSON files
import AlbanyData from "../data/Albany.json";
import TroyData from "../data/Troy.json";
import SchenectadyData from "../data/Schenectady.json";

// Fix Leaflet marker icons for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Helper: AND filtering (must include ALL selected tags)
function matchesFilters(landmark, activeTags) {
  if (activeTags.length === 0) return true;
  return activeTags.every((tag) => landmark.tags.includes(tag));
}

// ✅ Adapter: convert teammate format -> your app format
function normalizeCityFile(cityFile) {
  // cityFile looks like: { city: "Albany", landmarks: [...] }
  return cityFile.landmarks.map((lm) => ({
    // Make IDs unique across cities (since each file restarts at 1)
    id: `${cityFile.city.toLowerCase()}-${lm.id}`,

    name: lm.name,
    description: lm.description,
    address: lm.address,
    lat: lm.latitude,
    lng: lm.longitude,
    website: lm.website,

    // Tags: include the landmark type + the city name
    // (Later you can add more tags per landmark if you want)
    tags: [lm.type, cityFile.city],
  }));
}

export default function MapView() {
  const [selected, setSelected] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  // ✅ Combine all cities into one list
  const landmarks = useMemo(() => {
    return [
      ...normalizeCityFile(AlbanyData),
      ...normalizeCityFile(TroyData),
      ...normalizeCityFile(SchenectadyData),
    ];
  }, []);

  // ✅ Build the chips from actual data
  const allTags = useMemo(() => {
    const set = new Set();
    landmarks.forEach((l) => l.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [landmarks]);

  // ✅ Filter markers based on selected chips
  const filteredLandmarks = useMemo(() => {
    return landmarks.filter((l) => matchesFilters(l, activeTags));
  }, [landmarks, activeTags]);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

    // Close sheet if selection is no longer visible under the new filter set
    setSelected((prevSelected) => {
      if (!prevSelected) return null;
      const nextActive = activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag];
      return matchesFilters(prevSelected, nextActive) ? prevSelected : null;
    });
  }

  function clearTags() {
    setActiveTags([]);
  }

  return (
    <div className="map-wrapper">
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-title">
          Filters {activeTags.length > 0 && <span>({activeTags.length})</span>}
        </div>

        <div className="chip-row">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`chip ${activeTags.includes(tag) ? "chip-active" : ""}`}
              onClick={() => toggleTag(tag)}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>

        {activeTags.length > 0 && (
          <button className="clear-btn" onClick={clearTags} type="button">
            Clear
          </button>
        )}
      </div>

      {/* Map */}
      <MapContainer center={[42.68, -73.75]} zoom={12} className="map">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredLandmarks.map((lm) => (
          <Marker
            key={lm.id}
            position={[lm.lat, lm.lng]}
            eventHandlers={{
              click: () => setSelected(lm),
            }}
          />
        ))}
      </MapContainer>

      {/* Bottom sheet */}
      {selected && (
        <div className="bottom-sheet" role="dialog" aria-modal="true">
          <button className="close-btn" onClick={() => setSelected(null)} type="button">
            ✕
          </button>

          <h2 className="sheet-title">{selected.name}</h2>
          <p className="sheet-desc">{selected.description}</p>

          {selected.address && <p className="sheet-desc"><b>Address:</b> {selected.address}</p>}

          {selected.website && (
            <p className="sheet-desc">
              <a href={selected.website} target="_blank" rel="noreferrer">
                Official site
              </a>
            </p>
          )}

          <div className="tag-row">
            {selected.tags.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
