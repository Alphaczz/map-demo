import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "80vw",
  height: "80vh",
  margin: "auto",
  border: "2px solid #ccc",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  top: "10vh",
};

// **New Route: Wagle Estate to Banyan Park TCS**
const origin = { lat: 19.2094, lng: 72.9742 }; // Wagle Estate, Thane
const destination = { lat: 19.1312, lng: 72.8765 }; // Banyan Park, TCS, Mumbai

// **Checkpoints Along the Route**
const checkpoints = [
  { lat: 19.1602, lng: 72.9283 }, // Eastern Express Highway Entry
  { lat: 19.1364, lng: 72.8779 }, // JVLR Junction
];

const DifferentRoute = () => {
  const navigate = useNavigate();
  const [directions, setDirections] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Function to fetch directions after map is loaded
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

  // Trigger fetchDirections only when the map is loaded
  useEffect(() => {
    if (mapLoaded) {
      fetchDirections();
    }
  }, [mapLoaded]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <div style={containerStyle}>
        <LoadScript googleMapsApiKey="AIzaSyAO-41edi7Zwm1GSqjRBb39ycsFHPVvo_M">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={origin}
            zoom={12}
            onLoad={() => setMapLoaded(true)} // Set map as loaded
          >
            {/* Render the route */}
            {directions && <DirectionsRenderer directions={directions} />}

            {/* Place markers at checkpoints */}
            {checkpoints.map((point, index) => (
              <Marker key={index} position={point} label={`${index + 1}`} />
            ))}

            {/* Start and End Markers */}
            <Marker position={origin} label="Start" />
            <Marker position={destination} label="End" />
          </GoogleMap>
        </LoadScript>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" style={{ backgroundColor: "#FF5733", color: "white" }} onClick={() => navigate("/")}>
          Back to Main Route
        </Button>
      </div>
    </div>
  );
};

export default DifferentRoute;
