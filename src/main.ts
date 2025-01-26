import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { counterReducer } from './app/store/counter/counter.reducer';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideEffects } from '@ngrx/effects';
import { WeatherEffects } from './app/store/weather/weather.effects';
import { weatherReducer } from './app/store/weather/weather.reducer';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                // Provide the router
    provideStore({                       // Register all reducers in a single call
      counter: counterReducer,
      weather: weatherReducer,
    }),
    provideEffects(WeatherEffects),     // Register WeatherEffects
    provideHttpClient(),                // Provide HttpClient for HTTP requests
  ],
}).catch((err) => console.error(err));
