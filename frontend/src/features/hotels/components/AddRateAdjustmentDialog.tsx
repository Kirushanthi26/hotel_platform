import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AddRateAdjustmentForm, type RateAdjustmentFormValues } from "./AddRateAdjustmentForm"


interface AddRateAdjustmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdjustmentAdd: (adjustment: RateAdjustmentFormValues) => void;
}

export const AddRateAdjustmentDialog = ({ isOpen, onClose, onAdjustmentAdd }: AddRateAdjustmentDialogProps) => {

    const handleFormSubmit = (values: RateAdjustmentFormValues) => {
        onAdjustmentAdd(values);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Add Rate Adjustment</DialogTitle>
                    <DialogDescription>
                        Add a new rate adjustment for this room type.
                    </DialogDescription>
                </DialogHeader>
                <AddRateAdjustmentForm onSubmit={handleFormSubmit} />
            </DialogContent>
        </Dialog>
    )
}
