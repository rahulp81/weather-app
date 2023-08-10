import clearImage from "../assets/Clear.png";
import heavyRainImage from "../assets/HeavyRain.png";
import heavyCloudImage from "../assets/HeavyCloud.png";
import hailImage from "../assets/Hail.png";
import lightCloudImage from "../assets/LightCloud.png";
import lightRainImage from "../assets/LightRain.png";
import showerImage from "../assets/Shower.png";
import sleetImage from "../assets/Sleet.png";
import snowImage from "../assets/Snow.png";
import thunderstormImage from "../assets/Thunderstorm.png";
import hazeImage from "../assets/haze.png";
import fogImage from "../assets/foggy.png";

const img = {
  clear: clearImage,
  heavyRain: heavyRainImage,
  heavyCloud: heavyCloudImage,
  hail: hailImage,
  lightCloud: lightCloudImage,
  lightRain: lightRainImage,
  shower: showerImage,
  sleet: sleetImage,
  snow: snowImage,
  thunderstorm: thunderstormImage,
  haze: hazeImage,
  fog: fogImage,
};

export default function weatherIcon(weather) {
  if (weather.main === "Clear") return img.clear;
  if (weather.main === "Thunderstorm") return img.thunderstorm;
  if (
    weather.main === "Drizzle" ||
    weather.description === "light rain" ||
    weather.description === "moderate rain"
  )
    return img.lightRain;
  if (weather.main === "Rain") {
    if (
      weather.description === "heavy intensity rain" ||
      weather.description === "very heavy rain" ||
      weather.description === "extreme rain"
    )
      return img.heavyRain;
    if (
      weather.description === "shower rain" ||
      weather.description === "heavy intensity shower rain" ||
      weather.description === "ragged shower rain"
    )
      return img.shower;
  }
  if (weather.main === "Snow") {
    if (
      weather.description === "sleet" ||
      weather.description === "light shower sleet" ||
      weather.description === "shower sleet" ||
      weather.description === "light rain and snow" ||
      weather.description === "rain and snow"
    )
      return img.sleet;
    else return img.snow;
  }
  if (weather.main === "Clouds") {
    if (
      weather.description === "few clouds" ||
      weather.description === "scattered clouds"
    )
      return img.lightCloud;
    else return img.heavyCloud;
  }

  if (weather.main == "Mist" || weather.main == "Fog") return img.fog;

  return img.haze;
}
