import { useContext } from "react";
import {
  setTempUnitContext,
  tempUnitContext,
} from "../context/tempUnitContext";

export default function TemperatureUNitSelection() {
  const currentTempUnit = useContext(tempUnitContext);
  const toggleTemperature = useContext(setTempUnitContext);

  return (
    <div className="container">
      <section className="flex gap-2.5 py-5 ml-auto">
        <button
          className={`font-[700] text-[18px] rounded-full h-[40px] w-[40px] ${
            currentTempUnit === "C"
              ? "bg-[#E7E7EB] text-[#110E3C]"
              : "text-[#E7E7EB] bg-[#585676]"
          }`}
          disabled={currentTempUnit === "C"}
          onClick={() => toggleTemperature("C")}
        >
          ℃
        </button>
        <button
          className={`font-[700] text-[18px] rounded-full h-[40px] w-[40px] ${
            currentTempUnit === "F"
              ? "bg-[#E7E7EB] text-[#110E3C]"
              : "text-[#E7E7EB] bg-[#585676]"
          }`}
          disabled={currentTempUnit === "F"}
          onClick={() => toggleTemperature("F")}
        >
          ℉
        </button>
      </section>
    </div>
  );
}
