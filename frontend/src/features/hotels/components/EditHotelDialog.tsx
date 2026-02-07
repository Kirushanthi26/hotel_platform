import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AddHotelForm, type HotelFormValues } from "./AddHotelForm"
import { type Hotel } from "@/api/listOfHotels";

interface EditHotelDialogProps {
    hotel: Hotel;
    isOpen: boolean;
    onClose: () => void;
    onHotelUpdate: (id: number, hotel: HotelFormValues) => void;
}

export const EditHotelDialog = ({ hotel, isOpen, onClose, onHotelUpdate }: EditHotelDialogProps) => {

    const handleFormSubmit = (values: HotelFormValues) => {
        onHotelUpdate(hotel.id, values);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Edit Hotel</DialogTitle>
                    <DialogDescription>
                        Update the details of the hotel below.
                    </DialogDescription>
                </DialogHeader>
                <AddHotelForm
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        hotelName: hotel.name,
                        address: hotel.address,
                        city: hotel.city,
                        country: hotel.country,
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}