export default function ForecastCards({ date, weather, max, min }) {
  return (
    <div className="flex flex-col font-[500]  pt-3 pb-1.5 gap-3 items-center bg-primary-100 text-accent-100 grow basis-0  max-w-[180px] min-w-[150px] ">
      <h3>{date}</h3>
      <img
        className="max-h-[65px] max-w-[85px] scale-125 translate-x-[-10px]"
        src={weather}
        alt=""
      />
      <div className=" flex gap-6 mt-5">
        <span className="">{max}</span>
        <span className="text-[#A09FB1]">{min}</span>
      </div>
    </div>
  );
}
