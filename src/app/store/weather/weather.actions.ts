

import { createAction, props } from '@ngrx/store';
import { WeatherData } from './weather.model';

// Add City
export const addCity = createAction('[Weather] Add City', props<{ city: string }>());

// Success and Failure for Weather API
export const loadWeatherSuccess = createAction('[Weather] Load Weather Success', props<{ weather: WeatherData }>());
export const loadWeatherFailure = createAction('[Weather] Load Weather Failure', props<{ error: string }>());

// Optional: Remove and Clear Cities
export const removeCity = createAction('[Weather] Remove City', props<{ cityName: string }>())
export const refreshCity = createAction('[Weather] Refresh City', props<{ cityId: string }>());
export const clearAllCities = createAction('[Weather] Clear All Cities'); // New Action