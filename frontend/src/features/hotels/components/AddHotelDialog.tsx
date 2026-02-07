import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AddHotelForm, type HotelFormValues, } from "./AddHotelForm"
import { useState } from "react";

interface AddHotelDialogProps {
    onHotelAdd: (hotel: HotelFormValues) => void;
}

export const AddHotelDialog = ({ onHotelAdd }: AddHotelDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleFormSubmit = (values: HotelFormValues) => {
        console.log(values)
        onHotelAdd(values);
        setOpen(false);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Hotel</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Add New Hotel</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new hotel property.
                    </DialogDescription>
                </DialogHeader>
                <AddHotelForm onSubmit={handleFormSubmit} />
            </DialogContent>
        </Dialog>
    )
}