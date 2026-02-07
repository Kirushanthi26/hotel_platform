
import { useState } from "react";
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
import type { HotelFormValues } from "../components/AddHotelForm";


export const HotelsPage = () => {
    const [hotels, setHotels] = useState<HotelFormValues[]>([]);

    const handleAddHotel = (hotel: HotelFormValues) => {
        setHotels((prevHotels) => [...prevHotels, hotel]);
    };

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
                            <TableHead>Room Types</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hotels.map((hotel, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{hotel.hotelName}</TableCell>
                                <TableCell>{`${hotel.city}, ${hotel.country}`}</TableCell>
                                <TableCell>Standard, Deluxe, Suite</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};