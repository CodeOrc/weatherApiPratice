import "./styles.css";
import { useState, useEffect } from "react";
import WeatherCard from "../Components/WeatherCard";
import { getOneDayWeatherByLocation } from "../public/scripts/weatherUtilities";
import locations from "../public/data/locations";

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
        </div>{" "}
        <select
          className="weather-select"
          value={location}
          onChange={handleLocationChange}
        >
          {locations.map((v) => {
            return <option value={v}>{v}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
