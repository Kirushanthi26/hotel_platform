import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Hotel } from "./listOfHotels";
import { type HotelFormValues } from "@/features/hotels/components/AddHotelForm";

interface UpdateHotelData {
  id: number;
  hotel: HotelFormValues;
}

const updateHotel = async ({ id, hotel }: UpdateHotelData): Promise<Hotel> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.put(
    `http://localhost:8000/api/v1/hotels/${id}`,
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

export const useUpdateHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
  });
};
