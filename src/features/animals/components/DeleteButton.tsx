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


type animalProps = {
    id: number,
    name: string
}

export const DeleteButton = ({ id, name }: animalProps) => {


    const handleSubmit = async () => {

        try {
            await api.delete(`/api/animal/${id}`)

        } catch (error) {
            console.error(error)
        }
    }


    return (<Dialog>
        <form>
            <DialogTrigger asChild>
                <Button variant="destructive"><Trash size={20} /></Button>
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
        </form>
    </Dialog>
    )
}