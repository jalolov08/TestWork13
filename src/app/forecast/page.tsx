"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { WeatherForecastResponse } from "@/types/weather.type";
import { AxiosError } from "axios";
import { handleError } from "@/utils/errorHandler";
import { useSearchParams } from "next/navigation";

export default function Forecast() {
  const [forecast, setForecast] = useState<WeatherForecastResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  if (!city) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        Пожалуйста, укажите город для прогноза.
      </div>
    );
  }

  useEffect(() => {
    if (city) {
      fetchForecast(city);
    }
  }, [city]);

  const fetchForecast = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get<WeatherForecastResponse>("forecast", {
        params: { q: city, cnt: 5 },
      });
      setForecast(res.data);
    } catch (err) {
      handleError(
        err as AxiosError,
        setError,
        "Ошибка при получении прогноза."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка прогноза...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h3>Прогноз на 5 дней для {city}</h3>
      <div className="row">
        {forecast?.list.slice(0, 5).map((day, index) => (
          <div key={index} className="col-md-2 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{day.dt_txt}</h5>

                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                  className="mb-2"
                  style={{ width: "50px", height: "50px" }}
                />

                <p className="card-text text-muted">
                  {day.weather[0].description}
                </p>

                <p className="card-text">
                  <strong>Температура:</strong> {day.main.temp}°C
                </p>

                <p className="card-text text-muted">
                  <small>Ветер: {day.wind.speed} м/с</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
