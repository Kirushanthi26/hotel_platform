import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { type RoomType } from "./createRoom";

const fetchAllRoomTypes = async (): Promise<RoomType[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.get(`http://localhost:8000/api/v1/room-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useRoomTypes = (hotelId: string) => {
  return useQuery<RoomType[], Error, RoomType[]>({
    queryKey: ["allRoomTypes"],
    queryFn: fetchAllRoomTypes,
    select: (data) =>
      data.filter((room) => room.hotel_id === parseInt(hotelId, 10)),
    enabled: !!hotelId,
  });
};
