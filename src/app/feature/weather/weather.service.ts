import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable } from 'rxjs';
import { WeatherData } from '../../store/weather/weather.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.openWeatherApiKey;
  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`);
  }


  getWeatherWithForecast(city: string): Observable<WeatherData> {
    return this.http
      .get<any>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
      .pipe(
        // Map the current weather data
        map(current => ({
          city: current.name,
          currentWeather: {
            temperature: current.main.temp,
            description: current.weather[0].description,
            wind: current.wind.speed,
            pressure: current.main.pressure,
          },
        })),
        mergeMap(currentWeatherData =>
          this.http
            .get<any>(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`)
            .pipe(
              map(forecastData => {
                // Create a Map to ensure unique dates
                const uniqueDays = new Map<string, any>();

                forecastData.list.forEach((item: any) => {
                  const date = new Date(item.dt_txt);
                  const dateKey = date.toISOString().split('T')[0]; // Get the unique date (YYYY-MM-DD)
                  if (!uniqueDays.has(dateKey)) {
                    uniqueDays.set(dateKey, {
                      date: date.getDate(), // Day of the month (e.g., 25)
                      day: date.toLocaleString('en-US', { weekday: 'short' }), // Short day name (e.g., "Sat")
                      temperature: item.main.temp, // Temperature
                    });
                  }
                });

                // Return the first 5 unique days
                const forecast = Array.from(uniqueDays.values()).slice(0, 5);

                return {
                  ...currentWeatherData,
                  forecast,
                } as WeatherData;
              })
            )
        )
      );
  }

}
