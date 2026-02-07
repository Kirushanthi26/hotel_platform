import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AddRoomForm, type RoomFormValues } from "./AddRoomForm"
import { type RoomType } from "@/api/createRoom";

interface EditRoomDialogProps {
    room: RoomType;
    isOpen: boolean;
    onClose: () => void;
    onRoomUpdate: (id: number, room: RoomFormValues) => void;
}

export const EditRoomDialog = ({ room, isOpen, onClose, onRoomUpdate }: EditRoomDialogProps) => {

    const handleFormSubmit = (values: RoomFormValues) => {
        onRoomUpdate(room.id, values);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Edit Room Type</DialogTitle>
                    <DialogDescription>
                        Update the details of the room type below.
                    </DialogDescription>
                </DialogHeader>
                <AddRoomForm
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        name: room.name,
                        base_rate: parseFloat(room.base_rate),
                        capacity: room.capacity,
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}
