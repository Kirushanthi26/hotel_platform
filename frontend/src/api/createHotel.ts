import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Hotel } from "./listOfHotels";
import { type HotelFormValues } from "@/features/hotels/components/AddHotelForm";

const createHotel = async (hotel: HotelFormValues): Promise<Hotel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.post(
    "http://localhost:8000/api/v1/hotels/",
    {
      name: hotel.hotelName,
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const useCreateHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
  });
};
