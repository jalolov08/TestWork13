"use client";

import { api } from "@/lib/api";
import { useWeatherStore } from "@/store/useWeatherStore";
import { WeatherResponse } from "@/types/weather.type";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { handleError } from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { result, setResult, addFavorite, removeFavorite, isFavorite } =
    useWeatherStore();
  const router = useRouter();

  useEffect(() => {
    if (!city.trim()) {
      setResult(null);
    }
  }, [city, setResult]);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Введите название города.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.get<WeatherResponse>("weather", {
        params: { q: city },
      });
      setResult(res.data);
    } catch (err) {
      handleError(err as AxiosError, setError, "Ошибка при получении данных.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = () => {
    if (result) {
      if (isFavorite(result.name)) {
        removeFavorite(result.name);
      } else {
        addFavorite(result.name);
      }
    }
  };

  const handleViewForecast = () => {
    if (result) {
      router.push(`/forecast?city=${result.name}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Введите город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>
          Найти
        </button>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {result && !loading && !error && (
        <div className="card p-3 mt-3">
          <h3>
            {result.name}, {result.sys.country}
          </h3>

          <Image
            width={50}
            height={50}
            src={`https://openweathermap.org/img/wn/${result.weather[0].icon}.png`}
            alt={result.weather[0].description}
            className="mb-3"
          />

          <p>Температура: {result.main.temp}°C</p>
          <p>Ощущается как: {result.main.feels_like}°C</p>
          <p>Погода: {result.weather[0].description}</p>
          <p>Ветер: {result.wind.speed} м/с</p>

          <button
            className={`btn ${
              isFavorite(result.name)
                ? "btn-outline-success"
                : "btn-outline-warning"
            }`}
            onClick={handleFavoriteClick}
          >
            {isFavorite(result.name) ? "В избранном" : "Добавить в избранное"}
          </button>

          <button
            className="btn btn-outline-info mt-3"
            onClick={handleViewForecast}
          >
            Смотреть прогноз на 5 дней
          </button>
        </div>
      )}
    </div>
  );
}
