import { useState, useContext} from "react";
import Search from "../components/Search";
import FadeLoader from "react-spinners/FadeLoader";
import _ from 'lodash';
import weatherIcon from "../Utility Functions/weatherIconPicker";
import { CurrentWeatherContext, SetCurrentWeatherContext} from "../context/currentWeatherContext.js";
import { tempUnitContext} from "../context/tempUnitContext";
import pin from "../assets/pin-alt.svg"


export default function CurrentWeather({ selectCity,selectedCity}) {
  const [show, setShow] = useState(false);
  const currentWeather = useContext(CurrentWeatherContext);
  const resetCurrentWeather = useContext(SetCurrentWeatherContext);
  const tempUnit = useContext(tempUnitContext);


  const loading = currentWeather ? false : true;
  const options = { weekday: "short", day: "numeric", month: "short" };
  const formattedDate = new Date().toLocaleString("en-US", options);
  let imgSrc;
  if(currentWeather)  {
    imgSrc = weatherIcon(currentWeather.weather[0]);
  }

  function searchToggle() {
    setShow(!show);
  }

  function currentLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const currentCity = { lat, lon };
        selectCity(currentCity);
        resetCurrentWeather(null);
      },
      (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert('Current location permission denied please enable it!');
          }
      }
    );
    }

  return (
    <div className="lg:min-w-[400px] min-h-fit height md:min-w-[325px]  xl:min-w-[460px] min-[1700px]:min-w-[500px] ">
      <div className="bg-primary-100 min-h-full text-accent-100 flex flex-col items-center relative">
        <div className="min-w-[100%] ">
          <div className="flex justify-between py-5 px-3 ">
            <button
              className="bg-[#6E707A] text-[1rem] py-2 px-4 shadow-button"
              onClick={searchToggle}
            >
              Search for Places
            </button>
            <button className="bg-[#6E707A] rounded-full h-[40px] w-[40px] flex justify-center items-center shadow-button" onClick={currentLocation}>
              <box-icon name="current-location" color="#E7E7EB"></box-icon>
            </button>
          </div>
        </div>
        {loading ? (
          <div className="h-[500px] flex justify-center items-center">
            <FadeLoader color="#E7E7EB" className="" />
          </div>
        ) : (
          <div className="w-[100%]  ">
            <div className=" bf flex items-center justify-center overflow-clip">
              <img
                className="mt-[3rem] max-h-[200px] max-w-[200px] pb-4"
                src={imgSrc}
                alt="none"
              />
            </div>
            <div className="text-center flex flex-col items-center ">
              <p className="text-[144px] font-[600] leading-[160px] break-all mx-2 ">
                <span className="">{tempUnit == 'C' ?
                Math.round(currentWeather.main.temp-(273.15)) :
                (Math.round(1.8 * (currentWeather.main.temp - 273.15) + 32) )
                }
                </span>
                { tempUnit =='C' ?
                (<span className="text-[48px] text-[#A09FB1] | celcius"> &#8451;</span>) :
                (<span className="text-[48px] text-[#A09FB1] | FAHRENHEIT"> &#8457;</span>)
                }
              </p>
              <p className="text-[32px] leading-[21.13px] text-[#A09FB1] font-[600] pb-4 break-words mx-2">
                {_.startCase(currentWeather.weather[0].description)}
              </p>
              <div className="mt-8 flex flex-col gap-4 text-[#88869D] text-[18px] font-[500] ">
                <p className="flex justify-between min-w-[12rem]">
                  <span className="">Today</span>
                  <span>•</span>
                  <span>{formattedDate}</span>
                </p>
                <div className="relative flex flex-row gap-5 font-[600] justify-evenly pb-6">
                  <img
                    className="translate-x-1"
                    src={pin}
                    alt=""
                  />
                  <p className="min-h-[27px] translate-x-[-6px]">
                    {(selectedCity.name  || currentWeather.name) + ", " + currentWeather.sys.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <Search
          show={show}
          clickHandler={searchToggle}
          selectCity={selectCity}
          resetCurrentWeather = {resetCurrentWeather}
        />
      </div>
    </div>
  );
}
