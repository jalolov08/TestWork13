export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

export interface WeatherForecastResponse {
  list: Array<{
    wind: {
      speed: number;
    };
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: Array<{ description: string; icon: string }>;
  }>;
}
