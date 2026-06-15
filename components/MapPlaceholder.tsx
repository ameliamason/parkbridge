"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

declare global {
  interface Window {
    google: typeof google;
    initParkBridgeMap?: () => void;
  }
}

export function MapPlaceholder({ className = "", lat = 51.505, lng = -0.09, zoom = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY) return;
    if (!ref.current) return;

    function init() {
      if (!ref.current || !window.google?.maps) return;
      new window.google.maps.Map(ref.current, {
        center: { lat, lng },
        zoom,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
      });
    }

    if (window.google?.maps) {
      init();
      return;
    }

    window.initParkBridgeMap = init;

    if (document.querySelector("#pb-gmaps-script")) return;
    const script = document.createElement("script");
    script.id = "pb-gmaps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places&callback=initParkBridgeMap`;
    script.async = true;
    document.head.appendChild(script);
  }, [lat, lng, zoom]);

  return (
    <div ref={ref} className={`bg-gray-100 ${className}`}>
      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
        <div className="flex h-full items-center justify-center text-sm text-gray-400">
          Map · add NEXT_PUBLIC_GOOGLE_MAPS_KEY
        </div>
      )}
    </div>
  );
}
