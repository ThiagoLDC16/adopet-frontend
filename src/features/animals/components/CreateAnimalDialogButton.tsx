import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateAnimalDialog } from "./CreateAnimalDialog";
import { useState } from "react";

type CreateAnimalDialogButtonProps = {
    fetchMyAnimals: () => Promise<void>,
    onAddAnimal: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateAnimalDialogButton({fetchMyAnimals, onAddAnimal}: CreateAnimalDialogButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    Novo animal
                </Button>
            </DialogTrigger>

            <CreateAnimalDialog setIsOpen={setIsOpen} 
            fetchMyAnimals={fetchMyAnimals}
            onAddAnimal={onAddAnimal}/>
        </Dialog>
    )
}