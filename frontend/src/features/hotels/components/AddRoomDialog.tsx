import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AddRoomForm, type RoomFormValues } from "./AddRoomForm"
import { useState } from "react";

interface AddRoomDialogProps {
    onRoomAdd: (room: RoomFormValues) => void;
}

export const AddRoomDialog = ({ onRoomAdd }: AddRoomDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleFormSubmit = (values: RoomFormValues) => {
        onRoomAdd(values);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Room Type</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Add New Room Type</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new room type.
                    </DialogDescription>
                </DialogHeader>
                <AddRoomForm onSubmit={handleFormSubmit} />
            </DialogContent>
        </Dialog>
    )
}