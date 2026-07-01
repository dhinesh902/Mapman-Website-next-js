"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";
import { Navigation, MapPin } from "lucide-react";

// Fix leaflet icon issue in Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Location {
  id: number;
  shopName: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  rating: number;
  distance: string;
  image: string;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ locations }: { locations: Location[] }) {
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
      
      {locations.map((loc) => (
        <Marker 
          key={loc.id} 
          position={[loc.latitude, loc.longitude]}
          icon={customIcon}
        >
          <Popup className="custom-popup">
            <div className="w-[200px] overflow-hidden rounded-lg">
              <div className="relative h-24 w-full">
                <Image src={loc.image} alt={loc.shopName} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-base mb-1">{loc.shopName}</h3>
                <p className="text-primary text-xs font-semibold mb-2">{loc.category}</p>
                <div className="flex items-center gap-1 text-xs text-slate-600 mb-3">
                  <MapPin className="w-3 h-3" /> {loc.address}
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1 transition-colors">
                  <Navigation className="w-3 h-3" /> View Details
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
