import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteHotel = async (id: number): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found.');
    }

    await axios.delete(`http://localhost:8000/api/v1/hotels/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const useDeleteHotel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteHotel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hotels'] });
        },
    });
};
