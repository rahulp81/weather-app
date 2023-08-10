export default function windDirection(deg) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const normalizedDegree = (deg + 360) % 360;
  const index = Math.round(normalizedDegree / 22.5) % 16;

  return directions[index];
}
