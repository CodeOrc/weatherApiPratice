import "./styles.css";
import { useState, useEffect } from "react";
import WeatherCard from "./Components/WeatherCard";
import LocationSelect from "./Components/LocationSelect";
import { getOneDayWeatherByLocation } from "./scripts/weatherUtilities";

export default function App() {
  const [location, setLocation] = useState("臺北市");
  const [data, setData] = useState(null);
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  useEffect(() => {
    getOneDayWeatherByLocation(location, setData);
  }, [location]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="main-title">地區天氣</h1>
        <div className="card-container">
          {data && <WeatherCard {...data.elements} />}
        </div>
        <LocationSelect value={location} onChange={handleLocationChange} />
      </div>
    </div>
  );
}
