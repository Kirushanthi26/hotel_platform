import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteRoomType = async (id: number): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found.');
    }

    await axios.delete(`http://localhost:8000/api/v1/room-types/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const useDeleteRoomType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRoomType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allRoomTypes'] });
        },
    });
};
