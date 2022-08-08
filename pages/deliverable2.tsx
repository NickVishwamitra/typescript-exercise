import { useState } from "react";
import { CityWeather } from "../components/city-weather";
import CityWeatherRefactor from "../components/city-weather-refactor";
import Head from "next/head";
import Link from "next/link";
export default function IndexPage() {
  const [city, setCity] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  return (
    <div className="py-10">
      <Head>
        <meta
          name="description"
          content="A weather app built by Nick Vishwamitra for Hilton"
        />
        <title>Weather App</title>
      </Head>
      <form
        className=" flex flex-col sm:flex-col md:flex-row items-center justify-center"
        onSubmit={async (e) => {
          e.preventDefault();
          // Using environment variables to avoid hardcoding the API key
          const validCity = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
          ).then(async (res) => res.json());

          // Check if the city is valid
          city
            ? validCity.cod === "404"
              ? alert("Invalid City")
              : setSubmitted(true)
            : alert("Please enter a city");
        }}
      >
        <label
          className="font-medium text-lg md:mb-0 mb-2"
          htmlFor="weather-search"
        >
          Weather Search:
        </label>{" "}
        <div className="flex items-center justify-center ml-2  rounded-lg border-[#abb5c445] border-2 h-12">
          <input
            data-testid="weather-input"
            placeholder="Search for a city"
            id="weather-search"
            aria-label="Search for a city"
            className="px-2 h-full rounded-md rounded-r-none focus: border-[#4683c8]"
            type="text"
            onChange={(e) => {
              setSubmitted(false);
              setCity(e.target.value);
            }}
            value={city}
            name="city"
          />
          <button
            className="hover:bg-[#3b72b1] text-sm w-20 h-full rounded-md rounded-l-none text-white bg-[#4683c8] font-bold"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
      {submitted && (
        <div className="mt-16 w-full flex justify-center">
          <CityWeatherRefactor city={city}></CityWeatherRefactor>
        </div>
      )}
      <div className="w-full flex justify-center px-20 mt-60">
        <Link href="/">
          <button
            aria-label="Previous page"
            className="p-2 px-4 border-[#4683c8] border-2 rounded-md text-[#4683c8] text-sm font-semibold hover:bg-[#4683c8] hover:text-white"
          >
            ⬅️ Deliverable 1
          </button>
        </Link>
      </div>
    </div>
  );
}
