import { WeatherResponse } from "@/types/weather.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WeatherState {
  favorites: string[];
  result: WeatherResponse | null;
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  setResult: (data: WeatherResponse | null) => void;
  isFavorite: (cityName: string) => boolean;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      favorites: [],
      result: null,
      addFavorite: (city) =>
        set((state) =>
          state.favorites.includes(city)
            ? state
            : { favorites: [...state.favorites, city] }
        ),
      removeFavorite: (city) =>
        set((state) => ({
          favorites: state.favorites.filter((c) => c !== city),
        })),
      setResult: (data) => set({ result: data }),
      isFavorite: (cityName) => {
        const state = get();
        return state.favorites.includes(cityName);
      },
    }),
    {
      name: "weather-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
