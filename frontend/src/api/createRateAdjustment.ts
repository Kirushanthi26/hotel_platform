import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface RateAdjustment {
    id: number;
    room_type_id: number;
    amount: string;
    effective_date: string;
    reason: string;
    created_by: number;
    created_at: string;
}

export interface CreateRateAdjustmentData {
    room_type_id: number;
    amount: number;
    effective_date: string;
    reason: string;
}

const createRateAdjustment = async (adjustmentData: CreateRateAdjustmentData): Promise<RateAdjustment> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found.');
    }

    const response = await axios.post('http://localhost:8000/api/v1/rate-adjustments/', adjustmentData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const useCreateRateAdjustment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRateAdjustment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allRateAdjustments'] });
        },
    });
};
