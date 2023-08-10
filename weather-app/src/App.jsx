import CurrentWeather from "./pages/CurrentWeather";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import {
  CurrentWeatherContext,
  SetCurrentWeatherContext,
} from "./context/currentWeatherContext";
import { tempUnitContext, setTempUnitContext } from "./context/tempUnitContext";

const apiKey = ``; //API KEY Here
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;

const defaultCity = {
  lon: 72.8479,
  lat: 19.0144,
  name: "Mumbai",
  country:"IN"
};

export default function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [tempUnit, setTempUnit] = useState();

  useEffect(() => {
    let ignore = false;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const currentCity = { lat, lon };
          if (!ignore) {
            setSelectedCity(currentCity);
          }
        },
        (error) => {
          if (!ignore) {
            if (error.code === error.PERMISSION_DENIED) {
              setSelectedCity(defaultCity);
              // You can display an error message or take other actions
            } else {
              setSelectedCity(defaultCity);
            }
          }
        }
      );
    } else {
      if (!ignore) {
        setSelectedCity(defaultCity);
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!selectedCity) return;

    async function getWeather(city) {
      const response = await fetch(
        baseUrl + `lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
      );
      const data = await response.json();

      if (!ignore) {
        setCurrentWeather(data);
      }
    }

    getWeather(selectedCity);

    return () => {
      ignore = true;
    };
  }, [selectedCity]);

  return (
    <main className="grid grid-cols-1 min-[900px]:grid-cols-[auto,3fr] max-w-[2000px] mx-auto min-h-screen">
      <CurrentWeatherContext.Provider value={currentWeather}>
        <SetCurrentWeatherContext.Provider value={setCurrentWeather}>
          <tempUnitContext.Provider value={tempUnit || "C"}>
            <setTempUnitContext.Provider value={setTempUnit}>
              <CurrentWeather
                selectedCity={selectedCity}
                selectCity={setSelectedCity}
              />
              <Dashboard selectedCity={selectedCity} />
            </setTempUnitContext.Provider>
          </tempUnitContext.Provider>
        </SetCurrentWeatherContext.Provider>
      </CurrentWeatherContext.Provider>
    </main>
  );
}
