import { ErrorResponse } from "@/types/error.type";
import { AxiosError } from "axios";

export const handleError = (
  err: AxiosError,
  setError: (message: string) => void,
  defaultMsg: string
) => {
  if (err.response) {
    const errorResponse = err.response.data as ErrorResponse;
    setError(`Ошибка: ${errorResponse.message}`);
  } else {
    setError(defaultMsg);
  }
};
