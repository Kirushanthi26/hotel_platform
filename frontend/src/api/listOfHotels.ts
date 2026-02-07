import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type Hotel = {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  created_at: string;
  updated_at: string;
};

const getHotels = async (): Promise<Hotel[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.get("http://localhost:8000/api/v1/hotels/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useHotels = () => {
  return useQuery<Hotel[], Error>({
    queryKey: ["hotels"],
    queryFn: getHotels,
    staleTime: 5 * 60 * 1000,
  });
};
