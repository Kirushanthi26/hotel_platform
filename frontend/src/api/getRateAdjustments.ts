import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { type RateAdjustment } from "./createRateAdjustment";

const fetchAllRateAdjustments = async (): Promise<RateAdjustment[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.get(
    `http://localhost:8000/api/v1/rate-adjustments/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const useRateAdjustments = () => {
  return useQuery<RateAdjustment[], Error>({
    queryKey: ["allRateAdjustments"],
    queryFn: fetchAllRateAdjustments,
  });
};
