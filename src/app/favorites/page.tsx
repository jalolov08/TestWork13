"use client";

import { useWeatherStore } from "@/store/useWeatherStore";
import { useRouter } from "next/navigation";

export default function Favorites() {
  const { favorites, removeFavorite } = useWeatherStore();
  const router = useRouter();

  const handleViewForecast = (cityName: string) => {
    router.push(`/forecast?city=${cityName}`);
  };

  return (
    <div>
      <h3>Избранные города</h3>
      {favorites.length === 0 ? (
        <p>У вас нет избранных городов.</p>
      ) : (
        <ul className="list-group">
          {favorites.map((cityName) => (
            <li
              key={cityName}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{cityName}</span>
              <div>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleViewForecast(cityName)}
                >
                  Смотреть прогноз
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => removeFavorite(cityName)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
