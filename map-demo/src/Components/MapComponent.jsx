import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "80vw",
  height: "80vh",
  margin: "auto",
  border: "2px solid #ccc",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  top: "10vh"
};

const polylineOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 1.0,
  strokeWeight: 4,
};

const dummyData = [
  { lat: 19.2183, lng: 72.9781 }, // Thane Wagale Estate
  { lat: 19.0862, lng: 72.9090 }, // Ghatkopar
  { lat: 19.1304, lng: 72.8780 }, // Banyan Park TCS Andheri
  { lat: 19.2183, lng: 72.9781 }  // Back to Thane Wagale Estate
];

const GoogleMapsPolyline = () => {
  const [runnerPath, setRunnerPath] = useState(dummyData);
  const [open, setOpen] = useState(false);
  const [newLat, setNewLat] = useState("");
  const [newLng, setNewLng] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRunnerPath(dummyData);
  }, []);

  const handleAddPoint = () => {
    if (newLat && newLng) {
      setRunnerPath([...runnerPath, { lat: parseFloat(newLat), lng: parseFloat(newLng) }]);
      setNewLat("");
      setNewLng("");
      setOpen(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <div style={containerStyle}>
      <LoadScript googleMapsApiKey="AIzaSyAO-41edi7Zwm1GSqjRBb39ycsFHPVvo_M">

          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={runnerPath.length > 0 ? runnerPath[0] : { lat: 19.2183, lng: 72.9781 }}
            zoom={12}
          >
            {runnerPath.length > 0 && <Polyline path={runnerPath} options={polylineOptions} />}
            {runnerPath.map((point, index) => (
              <Marker key={index} position={point} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#FF5733", color: "white" }}
          onClick={() => setOpen(true)}
        >
          Add Coordinate
        </Button>

        <Button
          variant="contained"
          style={{ backgroundColor: "#007BFF", color: "white" }}
          onClick={() => navigate("/different-route")}
        >
          See Different Route
        </Button>
      </div>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Coordinate</DialogTitle>
        <DialogContent>
          <TextField
            label="Latitude"
            value={newLat}
            onChange={(e) => setNewLat(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Longitude"
            value={newLng}
            onChange={(e) => setNewLng(e.target.value)}
            fullWidth
            margin="dense"
          />
          <Button onClick={handleAddPoint} color="primary" variant="contained" style={{ marginTop: 10 }}>
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default GoogleMapsPolyline;
