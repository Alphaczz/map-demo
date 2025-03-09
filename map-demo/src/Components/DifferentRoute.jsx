import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const origin = { lat: 19.2094, lng: 72.9742 }; // Wagle Estate, Thane
const destination = { lat: 19.1312, lng: 72.8765 }; // Banyan Park, TCS, Mumbai

const checkpoints = [
  { lat: 19.1602, lng: 72.9283 }, // Eastern Express Highway Entry
  { lat: 19.1364, lng: 72.8779 }, // JVLR Junction
];

const DifferentRoute = () => {
  const navigate = useNavigate();
  const [directions, setDirections] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const fetchDirections = () => {
    if (!mapLoaded || !window.google || !window.google.maps) {
      console.error("Google Maps is not loaded yet.");
      return;
    }

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        waypoints: checkpoints.map((point) => ({ location: point, stopover: true })),
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  useEffect(() => {
    if (mapLoaded) {
      fetchDirections();
    }
  }, [mapLoaded]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <LoadScript googleMapsApiKey="apikey">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={origin}
          zoom={12}
          onLoad={() => setMapLoaded(true)}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          {checkpoints.map((point, index) => (
            <Marker key={index} position={point} label={`${index + 1}`} />
          ))}
          <Marker position={origin} label="Start" />
          <Marker position={destination} label="End" />
        </GoogleMap>
      </LoadScript>
      
      <Button
        variant="contained"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#FF5733",
          color: "white",
        }}
        onClick={() => navigate("/")}
      >
        Back to Main Route
      </Button>
    </div>
  );
};

export default DifferentRoute;