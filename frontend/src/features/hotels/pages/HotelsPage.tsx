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
import { useHotels } from "@/api/listOfHotels";
import { useCreateHotel } from "@/api/createHotel";
import type { HotelFormValues } from "../components/AddHotelForm";



export const HotelsPage = () => {
    const { data: hotels, isLoading, isError } = useHotels();
    const { mutate: createHotel } = useCreateHotel();

    const handleAddHotel = (hotel: HotelFormValues) => {
        createHotel(hotel);
    };

    if (isLoading) {
        return <div>Loading hotels...</div>;
    }

    if (isError) {
        return <div>Error loading hotels.</div>;
    }

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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hotels?.map((hotel) => (
                            <TableRow key={hotel.id}>
                                <TableCell className="font-medium">{hotel.name}</TableCell>
                                <TableCell>{`${hotel.city}, ${hotel.country}`}</TableCell>
                                <TableCell>{format(new Date(hotel.updated_at), 'PPP')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};