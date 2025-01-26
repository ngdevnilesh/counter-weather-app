import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { WeatherData } from '../../store/weather/weather.model';
import * as WeatherActions from '../../store/weather/weather.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { WeatherState } from '../../store/weather/weather.state';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class WeatherComponent implements OnInit {
  cityName: string = '';
  weather$!: Observable<WeatherData[]>;
  forecastData: any;
  constructor(private store: Store<{ weather: WeatherState }>, library: FaIconLibrary) {
    // Select the cities and forecast data from the store
    this.weather$ = store.select(state => state.weather.cities);
  }

  ngOnInit(): void {
    // Select the forecast data from the weather state
    this.store.select(state => state.weather.foreCastData).subscribe(forecastData => {
      // Display only the forecast for the current city
      if (forecastData) {
        this.forecastData = forecastData;
        console.log("🚀 ~ this.forecastData:", this.forecastData)
      }
    });
  }
  getWeather() {
    this.store.dispatch(WeatherActions.addCity({ city: this.cityName }));
    this.cityName = '';
  }

  refreshCity(cityName: string): void {
    if (cityName) {
      this.store.dispatch(WeatherActions.refreshCity({ cityId: cityName }));
    } else {
      console.error('City name is undefined');
    }
  }

  removeCity(cityName: string): void {
    if (cityName) {
      this.store.dispatch(WeatherActions.removeCity({ cityName }));
    } else {
      console.error('City name is undefined or empty');
    }
  }

  clearCities(): void {
    this.store.dispatch(WeatherActions.clearAllCities());
  }

}
