import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet marker icons for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- Temporary landmark data (replace later with JSON file) ---
const LANDMARKS = [
  {
    id: 1,
    name: "RPI Campus",
    description: "Walkable campus views and architecture.",
    lat: 42.7294,
    lng: -73.6792,
    tags: ["Free", "History", "Day Trip"],
  },
  {
    id: 2,
    name: "Prospect Park (Troy)",
    description: "Scenic overlooks and trails.",
    lat: 42.7280,
    lng: -73.6869,
    tags: ["Nature", "Adventure", "Free"],
  },
  {
    id: 3,
    name: "Empire State Plaza",
    description: "Iconic architecture + events (seasonal).",
    lat: 42.6513,
    lng: -73.7570,
    tags: ["Arts", "Event", "History"],
  },
];

// Helper: AND filtering (must include ALL selected tags)
function matchesFilters(landmark, activeTags) {
  if (activeTags.length === 0) return true;
  return activeTags.every((tag) => landmark.tags.includes(tag));
}

export default function MapView() {
  const [selected, setSelected] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  // Build list of all tags from data (for chips)
  const allTags = useMemo(() => {
    const set = new Set();
    LANDMARKS.forEach((l) => l.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // Filter landmarks for markers
  const filteredLandmarks = useMemo(() => {
    return LANDMARKS.filter((l) => matchesFilters(l, activeTags));
  }, [activeTags]);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

    // Optional: if current selected landmark is filtered out, close sheet
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
