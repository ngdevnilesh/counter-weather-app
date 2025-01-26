import { WeatherData } from "./weather.model";

export interface WeatherState {
  cities: WeatherData[];
  foreCastData: any;
  error: string | null;
}