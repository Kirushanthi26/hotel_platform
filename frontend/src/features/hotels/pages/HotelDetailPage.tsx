import { useParams, useNavigate } from 'react-router-dom';
import { useHotelDetails } from '@/api/getHotelDetails';
import { useRoomTypes } from '@/api/getRoomTypes';
import { useCreateRoom, type RoomType } from '@/api/createRoom';
import { useUpdateRoomType } from '@/api/updateRoomType';
import { useDeleteRoomType } from '@/api/deleteRoomType';
import { useRateAdjustments } from '@/api/getRateAdjustments';
import { useCreateRateAdjustment, type RateAdjustment } from '@/api/createRateAdjustment';
import { AddRoomDialog } from '../components/AddRoomDialog';
import { EditRoomDialog } from '../components/EditRoomDialog';
import { AddRateAdjustmentDialog } from '../components/AddRateAdjustmentDialog';
import { type RoomFormValues } from '../components/AddRoomForm';
import { type RateAdjustmentFormValues } from '../components/AddRateAdjustmentForm';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useState } from 'react';

const EffectiveRate = ({ room, adjustments }: { room: RoomType, adjustments: RateAdjustment[] | undefined }) => {
    const relevantAdjustments = adjustments?.filter(adj => adj.room_type_id === room.id) || [];
    const totalAdjustment = relevantAdjustments.reduce((acc, adj) => acc + parseFloat(adj.amount), 0);
    const effectiveRate = parseFloat(room.base_rate) + totalAdjustment;

    return <span>${effectiveRate.toFixed(2)}</span>;
};

export const HotelDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: hotel, isLoading: isLoadingHotel, isError: isErrorHotel } = useHotelDetails(id!);
    const { data: roomTypes, isLoading: isLoadingRooms, isError: isErrorRooms } = useRoomTypes(id!);
    const { data: allAdjustments, isLoading: isLoadingAdjustments } = useRateAdjustments();

    const { mutate: createRoom } = useCreateRoom();
    const { mutate: updateRoomType } = useUpdateRoomType();
    const { mutate: deleteRoomType } = useDeleteRoomType();
    const { mutate: createRateAdjustment } = useCreateRateAdjustment();

    const [editingRoom, setEditingRoom] = useState<RoomType | null>(null);
    const [adjustingRateRoom, setAdjustingRateRoom] = useState<RoomType | null>(null);

    const handleAddRoom = (room: RoomFormValues) => {
        createRoom({ hotel_id: parseInt(id!, 10), ...room });
    };

    const handleUpdateRoom = (roomId: number, room: RoomFormValues) => {
        if (editingRoom) {
            updateRoomType({ id: roomId, room, hotel_id: editingRoom.hotel_id });
        }
    };

    const handleAddRateAdjustment = (adjustment: RateAdjustmentFormValues) => {
        if (adjustingRateRoom) {
            createRateAdjustment({
                room_type_id: adjustingRateRoom.id,
                ...adjustment,
            });
        }
    };

    if (isLoadingHotel || isLoadingRooms || isLoadingAdjustments) return <div>Loading hotel details...</div>;
    if (isErrorHotel || isErrorRooms || !hotel) return <div>Error loading hotel details.</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                <div>
                    <AddRoomDialog onRoomAdd={handleAddRoom} />
                    <Button variant="outline" onClick={() => navigate(-1)} className="ml-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hotels
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Location</h2>
                    <p>{hotel.address}</p>
                    <p>{hotel.city}, {hotel.country}</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Room Types</h2>
                <Table>
                    <TableCaption>A list of room types available at this hotel.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Room Type</TableHead>
                            <TableHead>Base Rate</TableHead>
                            <TableHead>Max Occupancy</TableHead>
                            <TableHead>Effective Rate</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roomTypes?.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell className="font-medium">{room.name}</TableCell>
                                <TableCell>${room.base_rate}</TableCell>
                                <TableCell>{room.capacity}</TableCell>
                                <TableCell>
                                    <EffectiveRate room={room} adjustments={allAdjustments} />
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setEditingRoom(room)}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => deleteRoomType(room.id)}>
                                                Delete
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setAdjustingRateRoom(room)}>
                                                Add Rate Adjustment
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {editingRoom && (
                <EditRoomDialog
                    room={editingRoom}
                    isOpen={!!editingRoom}
                    onClose={() => setEditingRoom(null)}
                    onRoomUpdate={handleUpdateRoom}
                />
            )}

            {adjustingRateRoom && (
                <AddRateAdjustmentDialog
                    isOpen={!!adjustingRateRoom}
                    onClose={() => setAdjustingRateRoom(null)}
                    onAdjustmentAdd={handleAddRateAdjustment}
                />
            )}
        </div>
    );
};