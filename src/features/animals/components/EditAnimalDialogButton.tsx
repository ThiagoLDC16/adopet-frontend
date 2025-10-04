import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditAnimalDialog } from "./EditAnimalDialog";

export function EditAnimalDialogButton({ id }: { id: string}) {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Editar animal
                </Button>
            </DialogTrigger>

            <EditAnimalDialog id={id}/>
        </Dialog>
    )
}