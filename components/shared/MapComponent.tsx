"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIcon2xPng from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { businessMetadata } from "@/lib/caterer/business-metadata";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Fix marker icons
delete (L.Icon.Default as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIcon2xPng,
  shadowUrl: markerShadowPng,
});

const { map, businessName } = businessMetadata;

export default function MapComponent() {
  const handleViewOnGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${map.latitude},${map.longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div>
      <MapContainer
        className="h-[500px]"
        center={[map.latitude, map.longitude]}
        zoom={map.zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[map.latitude, map.longitude]}>
          <Popup>
            <h2>{name}</h2>
            {map.address}
          </Popup>
        </Marker>
      </MapContainer>
      <div className="flex flex-col items-center mt-8">
        <Button asChild variant={"outline"}>
          <Link
            href={`https://www.google.com/maps?q=${map.latitude},${map.longitude}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-justify text-wrap"
          >
            View on Google Maps
          </Link>
        </Button>
      </div>
    </div>
  );
}
