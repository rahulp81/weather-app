import FadeLoader from "react-spinners/FadeLoader";
import { CurrentWeatherContext } from "../context/currentWeatherContext";
import { useContext } from "react";
import windDirection from "../Utility Functions/windDirection";

export default function Highlights() {
  const currentWeather = useContext(CurrentWeatherContext);

  return (
    <>
      <div className="container pt-6 flex flex-col gap-6 gap-y-4">
        <h2 className="font-[700] text-[24px]  leading-5  py-2 ">
          Today’s Hightlights
        </h2>
        {!currentWeather ? (
          <FadeLoader color="#E7E7EB" className="mx-auto" />
        ) : (
          <div className=" flex gap-x-6 flex-wrap gap-y-4 justify-between ">
            <div className="bg-primary-100 flex flex-col grow basis-0 text-center py-5 px-1 gap-3 min-h-[204px] max-w-[328px] mx-auto min-w-[250px] xl:max-w-[460px] xl:min-h-0">
              <h3 className="text-accent-100">Wind status</h3>
              <p className="font-[500] text-[36px] leading-none">
                <span className="font-[700] text-[64px]">
                  {currentWeather.wind.speed}
                </span>{" "}
                kph
              </p>
              <div className="flex gap-2 justify-center items-center pt-3">
                <box-icon
                  name="chevron-up-circle"
                  color="#ffffff"
                  style={{ transform: `rotate(${currentWeather.wind.deg}deg)` }}
                ></box-icon>
                <span className="text-sm">
                  {windDirection(currentWeather.wind.deg)}
                </span>
              </div>
            </div>
            <div className="bg-primary-100 flex flex-col grow basis-0 text-center py-5 px-1 gap-3 min-h-[204px] max-w-[328px] mx-auto min-w-[250px] xl:max-w-[460px] xl:min-h-0">
              <h3 className="text-accent-100">Humidity</h3>
              <p className="font-[500] text-[36px] leading-none">
                <span className="font-[700] text-[64px]">
                  {currentWeather.main.humidity}
                </span>
                %
              </p>
              <div className="flex flex-col gap-0  min-w-[14.125rem] text-[#A09FB1] text-[12px] font-[700] mx-auto">
                <p className="flex justify-between">
                  <span>0</span>
                  <span className="ml-[8px]">50</span>
                  <span>100</span>
                </p>
                <div className="border-green-200 h-[0.5rem] bg-accent-100 rounded-[80px] overflow-hidden">
                  <div
                    className="bg-[#FFEC65] h-full"
                    style={{ width: `${currentWeather.main.humidity}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!currentWeather ? (
          <FadeLoader color="#E7E7EB" className="mx-auto" />
        ) : (
          <div className=" flex gap-x-6 flex-wrap gap-y-4 justify-between ">
            <div className="bg-primary-100 flex flex-col grow basis-0 text-center gap-3 py-5 px-1 min-h-[160px] max-w-[328px] mx-auto min-w-[250px] xl:max-w-[460px] xl:min-h-0 min-[1700px]:min-h-[160px] ">
              <h3>Visibilty</h3>
              <p className="font-[500] text-[36px] leading-none">
                <span className="font-[700] text-[64px]">
                  {currentWeather.visibility / 1000}
                </span>{" "}
                Km
              </p>
            </div>
            <div className="bg-primary-100 flex flex-col grow basis-0 text-center py-5 px-1 min-h-[160px] gap-3 max-w-[328px] mx-auto min-w-[250px] xl:max-w-[460px] xl:min-h-0 min-[1700px]:min-h-[160px] ">
              <h3>Air Pressure</h3>
              <p className="font-[500] text-[36px] leading-none">
                <span className="font-[700] text-[64px]">
                  {currentWeather.main.pressure}
                </span>{" "}
                mb
              </p>
            </div>
          </div>
        )}
      </div>
      <footer className="text-[#A09FB1] mt-6 pb-2  w-full bottom-0">
        <div className="container">
          <p className="mx-auto">
            created by{" "}
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/rahulp81"
            >
              Rahul R
            </a>
            <a
              href="https://devchallenges.io/challenges/mM1UIenRhK808W8qmLWv"
              target="_blank"
              rel="noopener noreferrer"
            >
              - devChallenges.io
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
