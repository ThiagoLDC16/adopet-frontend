import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { api } from '@/lib/api';

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateAnimalDialog() {
    const { register, handleSubmit, setValue } = useForm<CreateAnimalSchema>()
    const [ display, setDisplay ] = useState(false);

    type CreateAnimalSchema = {
        name: string,
        age: string,
        species: string,
        breed: string,
        description: string,
        characteristics: string,
        midia: FileList
    }

    function handleCreateAnimal(data: CreateAnimalSchema) {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("age", data.age)
        formData.append("species", data.species)
        formData.append("breed", data.breed)
        formData.append("description", data.description)
        formData.append("characteristics", data.characteristics)

        for (let i = 0; i < data.midia.length; i++) {
            formData.append("midia", data.midia[i])
        }

        api.post(
            "/api/animal/register",
            formData
        )
        .then(response => {
            console.log("Animal cadastrado " + response);
            setDisplay(true);
        })
        .catch(e => {
            console.log(e);
        })

    }

    return (
        <DialogContent>
            <DialogHeader className="text-left">
                <DialogTitle>Novo animal</DialogTitle>
                <DialogDescription>Adicione um novo animal ao sistema</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleCreateAnimal)} className="space y-6">
                <div className="grid grid-cols-4">
                    <Label htmlFor="name">Nome</Label>
                    <Input className="col-span-3" {...register('name')} id='name' />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="age">Idade</Label>
                    <Input className="col-span-3" id="age" {...register('age')} />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="species">Espécie</Label>
                    <Input className="col-span-3" id="species" {...register('species')} />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="breed">Raça</Label>
                    <Input className="col-span-3" id="breed" {...register('breed')} />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="description">Descrição</Label>
                    <Input className="col-span-3" id="description" {...register('description')} />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="characteristics">Características</Label>
                    <Input className="col-span-3" id="characteristics" {...register('characteristics')} placeholder="Separe por vírgula" />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="midia">Fotos/vídeos</Label>
                    <Input className="col-span-3" id="midia" multiple type="file" onChange={(e) => setValue("midia", e.target.files as FileList, { shouldValidate: false, })}/>
                </div>

                {display && <p className='text-right text-xl my-3 text-green-500'>Animal cadastrado!</p>}

                <DialogFooter className="flex-row justify-end mt-4">
                    <DialogClose>
                        <Button type="button" variant="destructive" className="px-6">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" variant="default" className="px-8">Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}