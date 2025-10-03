import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/api';

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useData } from '../hooks/useData';

export function EditAnimalDialog({ id }: { id: string }) {
    const animalData = useData(`/api/animal/id/${id}`);
    const [ newFiles, setNewFiles ] = useState<File[]>([])

    const { register, handleSubmit, setValue, reset } = useForm<EditAnimalSchema>({
        defaultValues: {
            name: '',
            age: '',
            species: '',
            breed: '',
            description: '',
            characteristics: '',
        }
    })

    const [display, setDisplay] = useState(false);

    const char: Array<string> = useMemo(() => animalData?.characteristics.map(c => c.characteristic.description) ?? [], [animalData]);

    useEffect(() => {
        if (animalData) {
            reset({
                name: animalData.name ?? "",
                age: String(animalData.age ?? ""),
                species: animalData.species ?? "",
                breed: animalData.breed ?? "",
                description: animalData.description ?? "",
                characteristics: char.join(', ')
            })
        }
    }, [animalData, reset, char]);

    type EditAnimalSchema = {
        id: number,
        name: string,
        age: string,
        species: string,
        breed: string,
        description: string,
        characteristics: string,
        midia?: FileList | null,
        adopterEmail?: string | null,
    }

    function handleEditAnimal(data: EditAnimalSchema) {
        const formData = new FormData()
        formData.append("id", id);
        formData.append("name", data.name)
        formData.append("age", data.age)
        formData.append("species", data.species)
        formData.append("breed", data.breed)
        formData.append("description", data.description)
        formData.append("characteristics", data.characteristics)
        if (data.adopterEmail) formData.append("adopterEmail", data.adopterEmail)

        if (data.midia) {
            for (let i = 0; i < data.midia.length; i++) {
                formData.append("midia", data.midia[i])
            }
        }

        api.put(
            `/api/animal/id/${id}`,
            formData
        )
            .then(response => {
                console.log("Animal editado " + response);
                setDisplay(true);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <DialogContent>
            <DialogHeader className="text-left">
                <DialogTitle>Editar animal</DialogTitle>
                <DialogDescription>Edite os dados do animal</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleEditAnimal)} className="space y-6">
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
                    <Input className="col-span-3" id="midia" multiple type="file" onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        setValue("midia", e.target.files as FileList, { shouldValidate: false, }); setNewFiles(files);}} />
                </div>

                <div className="pt-4 grid grid-cols-6">
                    {!display && <h3 className='text-sm'>Imagens atuais</h3>}
                    {!display && animalData?.midia.map(m => (
                        <img key={m.id} src={`${import.meta.env.VITE_API_URL}${m.url}`} className='h-18 object-cover rounded col-span-1' />
                    ))}

                    {newFiles.length > 0 && <h3 className='text-sm col-span-1 pl-2'>{!display ? "Preview" : "Imagens atuais"}</h3>}
                    {newFiles.map((file, i) => (
                        <img key={i} src={URL.createObjectURL(file)} className='h-18 object-cover rounded col-span-1' />
                    ))}
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="adopterEmail">Email do adotante</Label>
                    <Input className="col-span-3" id="adopterEmail" {...register('adopterEmail')} placeholder="Opcional" />
                </div>

                {display && <p className='text-right text-xl my-3 text-green-500'>Animal editado!</p>}

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