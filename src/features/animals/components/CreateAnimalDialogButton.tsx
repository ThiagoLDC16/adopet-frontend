import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateAnimalDialog } from "./CreateAnimalDialog";
import { useState } from "react";

export function CreateAnimalDialogButton({fetchMyAnimals}: {fetchMyAnimals: () => Promise<void>}) {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    Novo animal
                </Button>
            </DialogTrigger>

            <CreateAnimalDialog setIsOpen={setIsOpen} fetchMyAnimals={fetchMyAnimals}/>
        </Dialog>
    )
}