import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditAnimalDialog } from "./EditAnimalDialog";
import { Pencil } from "lucide-react";

export function EditAnimalDialogButton({ id }: { id: number}) {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Pencil size={14} /></Button>
            </DialogTrigger>

            <EditAnimalDialog id={id}/>
        </Dialog>
    )
}