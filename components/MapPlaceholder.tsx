"use client";

import { useEffect, useRef } from "react";
import type { Map, Marker, TileLayer } from "leaflet";

interface Pin {
  lat: number;
  lng: number;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

interface Props {
  className?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  pins?: Pin[];
  youAreHere?: boolean;
}

// London as default centre
const DEFAULT_LAT = 51.505;
const DEFAULT_LNG = -0.09;

export function MapPlaceholder({
  className = "",
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  zoom = 15,
  pins = [],
  youAreHere = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const youRef = useRef<Marker | null>(null);

  // Initialise map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      // Leaflet's default icon path breaks with bundlers — point to CDN
      (L.Icon.Default as unknown as { _getIconUrl?: unknown }).prototype._getIconUrl = undefined;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: [lat, lng],
        zoom,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      } as Parameters<typeof L.tileLayer>[1]).addTo(map);

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update centre when lat/lng/zoom change
  useEffect(() => {
    mapRef.current?.setView([lat, lng], zoom);
  }, [lat, lng, zoom]);

  // Sync pins
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    import("leaflet").then((L) => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      pins.forEach((pin) => {
        const icon = L.divIcon({
          html: `<div class="pb-pin${pin.selected ? " pb-pin--sel" : ""}">${pin.label}</div>`,
          className: "",
          iconAnchor: [0, 28],
        });
        const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);
        if (pin.onClick) marker.on("click", pin.onClick);
        markersRef.current.push(marker);
      });
    });
  }, [pins]);

  // You-are-here dot
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    import("leaflet").then((L) => {
      youRef.current?.remove();
      if (!youAreHere) return;
      const icon = L.divIcon({
        html: `<div class="pb-you"></div>`,
        className: "",
        iconAnchor: [10, 10],
      });
      youRef.current = L.marker([lat, lng], { icon, zIndexOffset: 1000 }).addTo(map);
    });
  }, [lat, lng, youAreHere]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        .pb-pin {
          background: oklch(0.55 0.15 250);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 10px;
          border: 1.5px solid white;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,.25);
        }
        .pb-pin--sel {
          background: oklch(0.58 0.13 150);
          transform: scale(1.1);
        }
        .pb-you {
          width: 20px; height: 20px;
          background: oklch(0.55 0.15 250);
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 4px oklch(0.55 0.15 250 / .25);
        }
      `}</style>
      <div ref={containerRef} className={`${className}`} />
      {/* Leaflet CSS — loaded inline to avoid a separate link tag in layout */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
    </>
  );
}
