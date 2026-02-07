import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { type Hotel } from "./listOfHotels";

const getHotelDetails = async (id: string): Promise<Hotel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.get(
    `http://localhost:8000/api/v1/hotels/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const useHotelDetails = (id: string) => {
  return useQuery<Hotel, Error>({
    queryKey: ["hotel", id],
    queryFn: () => getHotelDetails(id),
    enabled: !!id,
  });
};
