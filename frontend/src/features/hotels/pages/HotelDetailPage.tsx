import { useParams, useNavigate } from 'react-router-dom';
import { useHotelDetails } from '@/api/getHotelDetails';
import { useRoomTypes } from '@/api/getRoomTypes';
import { useCreateRoom } from '@/api/createRoom';
import { AddRoomDialog } from '../components/AddRoomDialog';
import { type RoomFormValues } from '../components/AddRoomForm';
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
import { ArrowLeft } from "lucide-react";

export const HotelDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: hotel, isLoading: isLoadingHotel, isError: isErrorHotel } = useHotelDetails(id!);
    const { data: roomTypes, isLoading: isLoadingRooms, isError: isErrorRooms, refetch } = useRoomTypes(id!);
    const { mutate: createRoom } = useCreateRoom();

    const handleAddRoom = (room: RoomFormValues) => {
        createRoom({
            hotel_id: parseInt(id!, 10),
            ...room
        });
        refetch()
    };

    if (isLoadingHotel || isLoadingRooms) {
        return <div>Loading hotel details...</div>;
    }

    if (isErrorHotel || isErrorRooms || !hotel) {
        return <div>Error loading hotel details.</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                <AddRoomDialog onRoomAdd={handleAddRoom} />
                <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hotels
                </Button>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roomTypes?.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell className="font-medium">{room.name}</TableCell>
                                <TableCell>${room.base_rate}</TableCell>
                                <TableCell>{room.capacity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};