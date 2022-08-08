import { useEffect, useState } from "react";
import { WeatherResult } from "../types";
import Image from "next/image";
interface CityWeatherProps {
  city: string;
}

const CityWeatherRefactor = (props: CityWeatherProps) => {
  const [weatherResult, setWeatherResult] = useState<WeatherResult | null>(
    null
  );
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    ).then(async (r) => setWeatherResult(await r.json()));
  }, [props.city]);
  if (!weatherResult) {
    return <div>Loading... </div>;
  }
  return (
    <div className="flex-col justify-center text-center w-56 p-3 shadow-lg bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-[#525b6b]">
        {props.city.toUpperCase()}
      </h1>
      <div className=" justify-center flex items-center">
        <Image
          alt={weatherResult?.weather[0]?.description + " weather icon"}
          className="object-cover w-32 h-32"
          width={125}
          height={125}
          src={`https://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@4x.png`}
        ></Image>
      </div>
      <div className="text-[#abb5c4] font-medium mb-1">
        {weatherResult?.weather[0]?.description?.charAt(0)?.toUpperCase() +
          weatherResult?.weather[0]?.description?.slice(1)}
      </div>
      <span className="text-[#abb5c4]">
        Temperature:{" "}
        <span className="text-4xl font-medium text-black ">
          {" "}
          {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </span>
      </span>
    </div>
  );
};

export default CityWeatherRefactor;

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}
