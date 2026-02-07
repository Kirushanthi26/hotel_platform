import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type RoomType } from "./createRoom";
import { type RoomFormValues } from "@/features/hotels/components/AddRoomForm";

interface UpdateRoomData {
  id: number;
  room: RoomFormValues;
  hotel_id: number;
}

const updateRoomType = async ({
  id,
  room,
  hotel_id,
}: UpdateRoomData): Promise<RoomType> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.put(
    `http://localhost:8000/api/v1/room-types/${id}`,
    { ...room, hotel_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRoomType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["roomTypes", data.hotel_id.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["allRoomTypes"] });
    },
  });
};
