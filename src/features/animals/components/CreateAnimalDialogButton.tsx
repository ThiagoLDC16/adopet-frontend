import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateAnimalDialog } from "./CreateAnimalDialog";

export function CreateAnimalDialogButton() {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Novo animal
                </Button>
            </DialogTrigger>

            <CreateAnimalDialog />
        </Dialog>
    )
}