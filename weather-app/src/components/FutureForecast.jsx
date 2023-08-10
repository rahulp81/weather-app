import { useEffect, useState, useContext } from "react";
import ForecastCard from "./ForecastCard";
import weatherIcon from "../Utility Functions/weatherIconPicker";
import FadeLoader from "react-spinners/FadeLoader";
import { tempUnitContext } from "../context/tempUnitContext";

const apiKey = ``; //API Key here
const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?`;

const options = { weekday: "short", day: "numeric", month: "short" };

export default function FutureForecast({ selectedCity }) {
  const [forecast, setForecast] = useState("");
  const currentUnit = useContext(tempUnitContext);
  useEffect(() => {
    let ignore = false;

    async function getForecast(city) {
      const response = await fetch(
        baseUrl + `lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
      );
      const data = await response.json();

      const pos = [8, 16, 24, 32, 39];
      const filteredData = pos.map((p) => data.list[p]);
      if (!ignore) {
        setForecast(filteredData);
      }
    }

    if (selectedCity && !ignore) {
      getForecast(selectedCity);
    }

    return () => {
      ignore = true;
    };
  }, [selectedCity]);

  return (
    <div className="container flex gap-6 py-2 flex-wrap justify-center">
      {!forecast ? (
        <FadeLoader color="#E7E7EB" className="" />
      ) : (
        forecast.map((data) => (
          <ForecastCard
            key={data.dt}
            date={
              data == forecast[0]
                ? "Tommorow"
                : new Date(data.dt * 1000).toLocaleString("en-US", options)
            }
            weather={weatherIcon(data.weather[0])}
            max={
              currentUnit == "C"
                ? Math.round(data.main.temp_max - 273.15) + "℃"
                : Math.round(1.8 * (data.main.temp_max - 273.15) + 32) + "℉"
            }
            min={
              currentUnit == "C"
                ? Math.round(data.main.temp_min - 273.15) + "℃"
                : Math.round(1.8 * (data.main.temp_min - 273.15) + 32) + "℉"
            }
          />
        ))
      )}
    </div>
  );
}
