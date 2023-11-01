import { dateFormat } from "../scripts/weatherUtilities";

export default function WeatherCard({ date, PoP12h, Wx, wxIcon, MinT, MaxT }) {
  return (
    <div className="weather-card">
      <div>{wxIcon}</div>
      <div className="weather-date">{dateFormat(date)}</div>
      <div className="weather-desc">{Wx}</div>
      <div className="weather-temp">{`${MinT}~${MaxT}℃`}</div>
      <div className="weather-pop">降雨率: {PoP12h}%</div>
    </div>
  );
}
