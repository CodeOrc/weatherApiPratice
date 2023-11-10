import locations from "../data/locations.json";
export default function LocationSelect({ value, onChange }) {
  return (
    <select className="weather-select" value={value} onChange={onChange}>
      {locations.map((v) => {
        return <option value={v}>{v}</option>;
      })}
    </select>
  );
}
