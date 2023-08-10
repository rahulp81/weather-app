import { useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { SetCurrentWeatherContext } from "../context/currentWeatherContext.js";

const baseUrl = `https://api.openweathermap.org/geo/1.0/direct`;
const apiKey = ``; //Your openweather API Key here
const limit = 5;

export default function Search({ clickHandler, show, selectCity }) {
  const [searchInput, setSearchInput] = useState("");
  const [cities, setCities] = useState("");
  const lastSearchQueryRef = useRef("");

  useEffect(() => {
    let ignore = false;

    async function searchCity(input) {
      try {
        const response = await fetch(
          baseUrl + `?q=${input}&limit=${limit}&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.length == 0) {
          lastSearchQueryRef.current = "null";
          setCities("null");
        }

        if (!ignore & (data.length > 0)) {
          lastSearchQueryRef.current = input;
          const filteredData = data.map((city) => ({
            name: city.name,
            country: city.country,
            state: city.state,
            lat: city.lat,
            lon: city.lon,
          }));
          setCities(filteredData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    const sanitizedInput = searchInput.trim();

    if (sanitizedInput.length < 3) {
      setCities("typing");
    }

    if (
      sanitizedInput.length > 1 &&
      (lastSearchQueryRef.current !== sanitizedInput ||
        sanitizedInput.length === 3)
    ) {
      searchCity(sanitizedInput);
    }

    return () => {
      ignore = true;
    };
  }, [searchInput]);

  return (
    <div
      className={` bg-primary-100  ${
        show ? "translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0"
      } absolute inset-0 z-10 transition-all duration-500 ease-in-out`}
    >
      <div className="flex flex-col max-w-[80%] gap-1 mx-auto ">
        <button className="pt-2 ml-auto translate-x-3 " onClick={clickHandler}>
          <box-icon name="x" color="#ffffff" size="32px"></box-icon>
        </button>
        <form className="flex mt-7 gap-2.5 flex-wrap justify-center relative">
          <label className="relative grow">
            <span className=" absolute inset-y-0 left-0 flex items-center pl-2">
              <box-icon name="search" color="#616475" size="24px"></box-icon>
            </span>
            <input
              className="py-2 pl-9 pr-2 outline-1 border-[1px] h-full w-full text-accent-100 border-accent-100  bg-primary-100  placeholder:text-[#616475]"
              type="search"
              placeholder="search location"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </label>
          {cities && (
            <SearchRecommendations
              citiesResult={cities}
              resetCities={setCities}
              selectCity={selectCity}
              clickHandler={clickHandler}
            />
          )}
        </form>
      </div>
    </div>
  );
}

function SearchRecommendations({
  citiesResult,
  resetCities,
  selectCity,
  clickHandler,
}) {
  const resetCurrentWeather = useContext(SetCurrentWeatherContext);

  if (citiesResult === "typing") {
    return null;
  }

  return (
    <ul className="bg-accent-100 absolute top-[100%] w-full mt-3 text-primary-100 flex flex-col rounded-md cursor-pointer overflow-hidden">
      {citiesResult == "null" ? (
        <li className="p-5 flex flex-col items-center ">
          <h3 className="font-[600]">No Results Found</h3>
          <p className="text-[14px] text-center ">
            Please check the Spelling and Re-Enter, or complete the full name,
            Also try in the format of City,State,Country for best results.
          </p>
        </li>
      ) : (
        citiesResult.map((city) => (
          <li
            key={city.lat}
            className="border-dotted border-b border-accent-200 p-3.5 "
            onClick={(e) => {
              resetCities("");
              selectCity(city);
              clickHandler();
              resetCurrentWeather(null);
            }}
          >
            {city.name}
            {city.state && "," + city.state}
            {city.country && "," + city.country}
          </li>
        ))
      )}
    </ul>
  );
}
