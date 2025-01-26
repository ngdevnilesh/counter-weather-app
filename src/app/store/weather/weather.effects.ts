import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WeatherActions from './weather.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { WeatherState } from './weather.reducer';
import { WeatherService } from '../../feature/weather/weather.service';

@Injectable()
export class WeatherEffects {
  constructor(
    private weatherService: WeatherService,
    private store: Store<{ weather: WeatherState }>
  ) { }

  /**
   * Effect to load weather for a new city
   */
  loadWeather$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(WeatherActions.addCity), // Triggered by 'addCity' action
      mergeMap(action =>
        this.weatherService.getWeatherWithForecast(action.city).pipe(
          map(weather => {
            return WeatherActions.loadWeatherSuccess({ weather });
          }),
          catchError(error => {
            const errorMessage =
              error.status === 404
                ? 'City not found. Please check the city name.'
                : 'Failed to load weather data. Please try again later.';
            console.error(`Error loading weather for city: ${action.city}`, error.message); // Debug log
            alert('City Not found');

            return of(WeatherActions.loadWeatherFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  /**
   * Effect to refresh weather for a city
   */
  refreshCity$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(WeatherActions.refreshCity), // Triggered by 'refreshCity' action
      mergeMap(action =>
        this.weatherService.getWeatherWithForecast(action.cityId).pipe(
          map(weather => {
            return WeatherActions.loadWeatherSuccess({ weather });
          }),
          catchError(error => {
            const errorMessage =
              error.status === 404
                ? 'City not found. Unable to refresh.'
                : 'Failed to refresh weather data. Please try again later.';
            alert('Error refreshing city');

            return of(WeatherActions.loadWeatherFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
}
