import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AnimalRegisterDialogButton() {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Novo animal
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="text-left">
                    <DialogTitle>Novo animal</DialogTitle>
                    <DialogDescription>Adicione um novo animal ao sistema</DialogDescription>
                </DialogHeader>

                <form className="space y-6">
                <div className="grid grid-cols-4">
                    <Label htmlFor="name">Nome</Label>
                    <Input className="col-span-3" id="name"/>
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="age">Idade</Label>
                    <Input className="col-span-3" id="age"/>
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="species">Espécie</Label>
                    <Input className="col-span-3" id="species"/>
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="breed">Raça</Label>
                    <Input className="col-span-3" id="breed"/>
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="description">Descrição</Label>
                    <Input className="col-span-3" id="description"/>
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="characteristics">Características</Label>
                    <Input className="col-span-3" id="characteristics" placeholder="Separe por vírgula"/>
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="midia">Fotos/vídeos</Label>
                    <Input className="col-span-3" id="midia" type="file"/>
                </div>

                    <DialogFooter className="flex-row justify-end mt-4">
                        <DialogClose>
                            <Button type="button" variant="destructive" className="px-6">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" variant="default" className="px-8">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}