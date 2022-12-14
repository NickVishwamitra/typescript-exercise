import type { NextApiRequest, NextApiResponse } from "next";
import { WeatherResult } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  const weatherResult = (await response.json()) as WeatherResult;
  res.status(200).json(weatherResult);
}
