import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { api } from "@/lib/api"
import { Trash } from "lucide-react"
import { useState } from "react"


interface animalProps {
    id: number,
    name: string,
    fetchMyAnimals: () => Promise<void>
}

export const DeleteButton = ({ id, name, fetchMyAnimals }: animalProps) => {
    const [open, setOpen] = useState(false)


    const handleSubmit = async () => {

        try {
            await api.delete(`/api/animal/${id}`)
            setOpen(false)
            await fetchMyAnimals();
        } catch (error) {
            console.error(error)
        }
    }


    return (<Dialog open={open} onOpenChange={setOpen}>

        <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)} variant="destructive"><Trash size={14} /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">

            <DialogHeader>
                <DialogTitle>Excluir pet</DialogTitle>
                <DialogDescription>
                    Tem certeza que deseja excluir <span className="font-bold">{name}</span>?
                </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex flex-row items-center justify-center">
                <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleSubmit} type="submit">Sim, excluir</Button>
            </DialogFooter>

        </DialogContent>

    </Dialog>
    )
}