import { API_KEY } from "@/config/config";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "ru",
  },
});
