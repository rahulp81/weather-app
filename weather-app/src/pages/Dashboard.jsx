import TemperatureUNitSelection from "../components/TemperatureUnitSelection"
import FutureForecast from "../components/FutureForecast"
import Highlights from "../components/Highlights"

export default function Dashboard({selectedCity}){

    return (
        <div className="bg-primary-200 text-accent-100 relative ">
            <TemperatureUNitSelection/>
            <FutureForecast selectedCity={selectedCity}/>
            <Highlights/>
        </div>

    )


}