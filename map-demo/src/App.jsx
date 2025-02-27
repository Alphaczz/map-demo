import { Routes, Route } from "react-router-dom";
import GoogleMapsPolyline from "./Components/MapComponent";
import DifferentRoute from "./Components/DifferentRoute";

function App() {
  return (
   
    <Routes>
      <Route path="/" element={<GoogleMapsPolyline />} />
      <Route path="/different-route" element={<DifferentRoute />} />
    </Routes>
  );
}

export default App;
