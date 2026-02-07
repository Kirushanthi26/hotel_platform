import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AddHotelDialog } from "../components/AddHotelDialog";
import { format } from "date-fns";
import { useHotels, type Hotel } from "@/api/listOfHotels";
import { useCreateHotel } from "@/api/createHotel";
import { useUpdateHotel } from "@/api/updateHotel";
import { useDeleteHotel } from "@/api/deleteHotel";
import type { HotelFormValues } from "../components/AddHotelForm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { EditHotelDialog } from "../components/EditHotelDialog";



export const HotelsPage = () => {
    const { data: hotels, isLoading, isError } = useHotels();
    const { mutate: createHotel } = useCreateHotel();
    const { mutate: updateHotel } = useUpdateHotel();
    const { mutate: deleteHotel } = useDeleteHotel();

    const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

    const handleAddHotel = (hotel: HotelFormValues) => {
        createHotel(hotel);
    };

    const handleUpdateHotel = (id: number, hotel: HotelFormValues) => {
        updateHotel({ id, hotel });
    };
    console.log(isLoading, isError)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Hotels</h1>
                    <p className="text-muted-foreground">Manage your hotel properties</p>
                </div>
                <AddHotelDialog onHotelAdd={handleAddHotel} />
            </div>
            <div>
                <Table>
                    <TableCaption>A list of your hotels.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Hotel</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hotels?.map((hotel) => (
                            <TableRow key={hotel.id}>
                                <TableCell className="font-medium">{hotel.name}</TableCell>
                                <TableCell>{`${hotel.city}, ${hotel.country}`}</TableCell>
                                <TableCell>{format(new Date(hotel.updated_at), 'PPP')}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setEditingHotel(hotel)}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => deleteHotel(hotel.id)}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {editingHotel && (
                <EditHotelDialog
                    hotel={editingHotel}
                    isOpen={!!editingHotel}
                    onClose={() => setEditingHotel(null)}
                    onHotelUpdate={handleUpdateHotel}
                />
            )}
        </div>
    );
};