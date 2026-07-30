"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "@/lib/geo";

/**
 * Leaflet's default marker resolves its PNGs by relative path, which breaks
 * under Next's bundler. A divIcon sidesteps that entirely and lets the pins
 * carry the brand colours.
 */
function pin(kind: "from" | "to") {
  const bg = kind === "from" ? "#FFCE00" : "#0B0B0B";
  const fg = kind === "from" ? "#0B0B0B" : "#FFCE00";
  const letter = kind === "from" ? "P" : "D";
  return L.divIcon({
    className: "",
    html: `<div style="
      width:28px;height:28px;border-radius:50% 50% 50% 0;
      background:${bg};border:2px solid #0B0B0B;
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 6px rgba(0,0,0,.35)">
        <span style="transform:rotate(45deg);color:${fg};font:700 12px/1 Inter,sans-serif">${letter}</span>
      </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
}

/** Keeps the whole route in frame whenever the geometry changes. */
function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length < 2) return;
    map.fitBounds(L.latLngBounds(coords), { padding: [36, 36] });
  }, [coords, map]);
  return null;
}

export default function QuoteMap({
  from,
  to,
  coordinates,
}: {
  from: Place;
  to: Place;
  coordinates: [number, number][];
}) {
  return (
    <div className="h-[320px] overflow-hidden rounded-2xl border border-ink/[0.08] shadow-[var(--shadow-card)] sm:h-[440px]">
      <MapContainer
        center={[from.lat, from.lon]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[from.lat, from.lon]} icon={pin("from")} />
        <Marker position={[to.lat, to.lon]} icon={pin("to")} />
        <Polyline positions={coordinates} pathOptions={{ color: "#0B0B0B", weight: 5 }} />
        <FitBounds coords={coordinates} />
      </MapContainer>
    </div>
  );
}
