"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Navigation, MapPin } from "lucide-react";

// Fix leaflet icon issue in Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

import { Shop } from "@/models/home_model";

const getCategoryColor = (category?: string) => {
  const cat = category?.toLowerCase() || "";
  switch (cat) {
    case "theater":
      return "#ff0000";
    case "restaurant":
      return "#ff8c00";
    case "hospital":
      return "#ff00ff";
    case "bar":
      return "#800080";
    case "grocery":
      return "#008000";
    case "textile":
      return "#0000ff";
    case "resort":
      return "#00ffff";
    case "bunk":
      return "#808080";
    case "spa":
      return "#ff69b4";
    case "hotel":
      return "#ffff00";
    case "jewellery":
      return "#ffd700";
    case "furniture":
      return "#8b4513";
    case "salons":
      return "#ffc0cb";
    default:
      return "#000000";
  }
};

const createCustomIcon = (category?: string) => {
  const color = getCategoryColor(category);
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
  });
};

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

import { useRef, useEffect as useMarkerEffect } from "react";
import Image from "next/image";

function ShopMarker({ loc, isSelected }: { loc: Shop; isSelected?: boolean }) {
  const markerRef = useRef<L.Marker>(null);

  useMarkerEffect(() => {
    if (isSelected && markerRef.current) {
      setTimeout(() => {
        markerRef.current?.openPopup();
      }, 500);
    }
  }, [isSelected]);

  return (
    <Marker
      ref={markerRef}
      position={[parseFloat(loc.lat as string), parseFloat(loc.long as string)]}
      icon={createCustomIcon(loc.category)}
    >
      <Tooltip
        permanent
        interactive
        direction="top"
        offset={[0, -10]}
        className="bg-transparent border-none shadow-none p-0"
        eventHandlers={{
          click: () => {
            markerRef.current?.openPopup();
          },
        }}
      >
        <div
          className="bg-white rounded-md py-1 px-1.5 text-center min-w-[70px] max-w-[120px] shadow-sm cursor-pointer"
          style={{ border: `2px solid ${getCategoryColor(loc.category)}` }}
          onClick={(e) => {
            e.stopPropagation();
            markerRef.current?.openPopup();
          }}
        >
          <div className="font-extrabold text-slate-900 text-[10px] truncate px-0.5 leading-tight">
            {loc.shopName}
          </div>
          <div className="text-slate-500 text-[8px] font-bold mt-0.5 capitalize">
            {loc.category}
          </div>
        </div>
      </Tooltip>
      <Popup className="custom-popup">
        <div className="w-[200px] overflow-hidden rounded-lg cursor-default">
          <div className="relative h-24 w-full">
            <Image
              src={
                loc.shopImage
                  ? loc.shopImage.startsWith("http")
                    ? loc.shopImage
                    : `https://api.mapman.in${loc.shopImage}`
                  : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
              alt={loc.shopName || "Shop"}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-bold text-base mb-1">{loc.shopName}</h3>
            <p className="text-primary text-xs font-semibold mb-2">
              {loc.category}
            </p>
            <div className="flex items-start gap-1 text-xs text-slate-600 mb-3">
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{loc.address}</span>
            </div>
            <button
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              onClick={() => {
                window.location.href = `/shop/${loc.id}`;
              }}
            >
              <Navigation className="w-3 h-3" /> View Details
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

function MapControllerSelected({
  locations,
  selectedShopId,
}: {
  locations: Shop[];
  selectedShopId?: string | null;
}) {
  const map = useMap();
  useMarkerEffect(() => {
    if (selectedShopId) {
      const shop = locations.find(
        (s) => String(s.id) === String(selectedShopId),
      );
      if (shop && shop.lat && shop.long) {
        map.flyTo(
          [parseFloat(shop.lat as string), parseFloat(shop.long as string)],
          16,
          { animate: true, duration: 1.0 },
        );
      }
    }
  }, [selectedShopId, locations, map]);
  return null;
}

export default function MapView({
  locations,
  selectedShopId,
}: {
  locations: Shop[];
  selectedShopId?: string | null;
}) {
  const defaultCenter: [number, number] = [13.0827, 80.2707]; // Chennai center

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <MapControllerSelected
        locations={locations}
        selectedShopId={selectedShopId}
      />

      {locations
        .filter((loc) => {
          const lat = parseFloat(loc.lat as string);
          const lng = parseFloat(loc.long as string);
          return !isNaN(lat) && !isNaN(lng);
        })
        .map((loc) => (
          <ShopMarker
            key={loc.id}
            loc={loc}
            isSelected={String(selectedShopId) === String(loc.id)}
          />
        ))}
    </MapContainer>
  );
}
