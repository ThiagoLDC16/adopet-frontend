import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditAnimalDialog } from "./EditAnimalDialog";
import { Pencil } from "lucide-react";
import { useState } from "react";

export function EditAnimalDialogButton({ id, fetchMyAnimals }: { id: number, fetchMyAnimals: () => Promise<void> }) {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><Pencil size={14} /></Button>
            </DialogTrigger>

            <EditAnimalDialog id={id} setIsOpen={setIsOpen} fetchMyAnimals={fetchMyAnimals}/>
        </Dialog>
    )
}