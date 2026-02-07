import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface RoomType {
    id: number;
    hotel_id: number;
    name: string;
    base_rate: string;
    capacity: number;
}

export interface CreateRoomTypeData {
    hotel_id: number;
    name: string;
    base_rate: number;
    capacity: number;
}

const createRoom = async (roomData: CreateRoomTypeData): Promise<RoomType> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found.');
    }

    const response = await axios.post('http://localhost:8000/api/v1/room-types/', roomData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const useCreateRoom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRoom,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['hotel', data.hotel_id.toString()] });
        },
    });
};