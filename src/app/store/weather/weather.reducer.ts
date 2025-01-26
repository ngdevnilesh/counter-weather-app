import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import { WeatherData } from './weather.model';

export interface WeatherState {
  cities: WeatherData[];
  error: string | null;
  foreCastData: any;
}

export const initialState: WeatherState = {
  cities: [],
  error: null,
  foreCastData: []
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeatherSuccess, (state, { weather }) => {
    const existingCityIndex = state.cities.findIndex(c => c.city === weather.city);

    let updatedCities = state.cities;
    if (existingCityIndex !== -1) {
      updatedCities = [
        weather,
        ...state.cities.filter((_, index) => index !== existingCityIndex),
      ];
    } else {
      updatedCities = [weather, ...state.cities];
    }

    if (updatedCities.length > 8) {
      updatedCities.pop();
    }

    // Store current city weather data 
    const currentCityWeather = {
      weather: weather,
      name: weather.city,
      description: weather.currentWeather.description,
      wind: weather.currentWeather.wind,
      pressure: weather.currentWeather.pressure,
      temperature: weather.currentWeather.temperature,
    };

    return {
      ...state,
      cities: updatedCities,
      foreCastData: currentCityWeather,  // Store current weather info for the selected city
      error: null,
    };
  }),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(WeatherActions.refreshCity, (state) => ({
    ...state,
    error: null,
  })),
  on(WeatherActions.clearAllCities, (state) => ({
    ...state,
    cities: [],
    foreCastData: {}  // Reset forecast data when clearing cities
  })), on(WeatherActions.removeCity, (state, { cityName }) => {
    const updatedCities = state.cities.filter(city => city.city !== cityName);

    let updatedForecastData = state.foreCastData;
    if (state.foreCastData?.name === cityName) {
      updatedForecastData = {};
    }

    return {
      ...state,
      cities: updatedCities,
      foreCastData: updatedForecastData,
    };
  })

);
