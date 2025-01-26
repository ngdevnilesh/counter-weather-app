import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WeatherActions from './weather.actions';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
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
            console.log(`Weather data loaded successfully for city: ${action.city}`, weather); // Debug log
            return WeatherActions.loadWeatherSuccess({ weather });
          }),
          catchError(error => {
            const errorMessage =
              error.status === 404
                ? 'City not found. Please check the city name.'
                : 'Failed to load weather data. Please try again later.';
            console.error(`Error loading weather for city: ${action.city}`, error.message); // Debug log
            alert('City Not found')


            return of(WeatherActions.loadWeatherFailure({ error: errorMessage }));
          })
        )
      )
    )
  );


  // /**
  //  * Effect to refresh weather for an existing city
  //  */
  // refreshCity$ = createEffect(() =>
  //   inject(Actions).pipe(
  //     ofType(WeatherActions.refreshCity), // Triggered by 'refreshCity' action
  //     withLatestFrom(this.store.select(state => state.weather.cities)), // Get current cities from the store
  //     mergeMap(([action, cities]) => {
  //       // Find the city by its ID or name
  //       const city = cities.find(c => c.city === action.cityId);
  //       if (!city) {
  //         const errorMessage = `City not found for refresh: ${action.cityId}`;
  //         console.error(errorMessage); // Debug log
  //         return of(WeatherActions.loadWeatherFailure({ error: errorMessage }));
  //       }

  //       console.log(`Refreshing weather data for city: ${city.city}`); // Debug log
  //       return this.weatherService.getWeatherWithForecast(city.city).pipe(
  //         map(weather => {
  //           console.log(`Weather data refreshed successfully for city: ${city.city}`, weather); // Debug log
  //           return WeatherActions.loadWeatherSuccess({ weather });
  //         }),
  //         catchError(error => {
  //           const errorMessage = `Error refreshing weather for city: ${city.city}`;
  //           console.error(errorMessage, error.message); // Debug log
  //           return of(WeatherActions.loadWeatherFailure({ error: errorMessage }));
  //         })
  //       );
  //     })
  //   )
  // );

}
