// eslint-disable @typescript-eslint/no-use-before-define
import { Component } from "react";
import { WeatherResult } from "../types";

const API_KEY = "10c0b6df21950cd958c5e7e2087814fc";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: WeatherResult | null;
}

export class CityWeather extends Component<CityWeatherProps, CityWeatherState> {
  public constructor(props: CityWeatherProps) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  public componentDidMount() {
    const { city } = this.props;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => this.setState({ weatherResult: result }));
  }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;
    if (!weatherResult) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </div>
        <div>Descripiton: {weatherResult.weather[0].description}</div>
      </div>
    );
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}
