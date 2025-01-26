export interface WeatherData {
  city: string; // City name
  foreCastData: any,
  currentWeather: {
    temperature: number; // Current temperature in Celsius
    description: string; // Weather description (e.g., 'clear sky')
    wind: number; // Wind speed in km/h
    pressure: number; // Atmospheric pressure in hPa
    error: string | null;  // New error property for API errors
  };
  forecast: {
    date: string;
    day: string;
    temperature: number;
  }[];
  
}
