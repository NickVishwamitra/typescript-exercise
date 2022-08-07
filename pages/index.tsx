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
        className="flex items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <span>Weather Search:</span>{" "}
        <input
          data-testid="weather-input"
          aria-label="Search for a city"
          className="ml-2 border px-2 py-1 border-black"
          type="text"
          onChange={(e) => {
            setSubmitted(false);
            setCity(e.target.value);
          }}
          value={city}
          name="city"
        />
        <button className="ml-2 text-sm border rounded-lg p-2" type="submit">
          SUBMIT
        </button>
      </form>

      {submitted && (
        <div className="mt-16 w-full flex justify-center">
          <CityWeather city={city} />
        </div>
      )}
      <div className="w-full flex justify-center px-20 mt-60">
        <Link href="/deliverable2">
          <button
            aria-label="Previous page"
            className="p-2 px-4 border-[#4683c8] border-2 rounded-md text-[#4683c8] text-sm font-semibold hover:bg-[#4683c8] hover:text-white"
          >
            Deliverable 2 ➡️
          </button>
        </Link>
      </div>
    </div>
  );
}
