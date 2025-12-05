import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { api } from '@/lib/api';

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CreateAnimalDialogProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    fetchMyAnimals: () => Promise<void>,
    onAddAnimal: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateAnimalDialog({ setIsOpen, fetchMyAnimals, onAddAnimal : setPetAdded }: CreateAnimalDialogProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateAnimalSchema>()
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasImage, setHasImage] = useState(true);

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

        if (data.midia) {
            for (let i = 0; i < data.midia.length; i++) {
                formData.append("midia", data.midia[i])
            }
            setHasImage(true);
        } else {
            setHasImage(false);
        }

        if (data.midia) {
            setLoading(true)
            api.post(
                "/api/animal/register",
                formData
            )
                .then(response => {
                    console.log("Animal cadastrado " + response);
                    setLoading(false)
                    setDisplay(true);
                    setIsOpen(false);
                    fetchMyAnimals();
                    setPetAdded(true);
                })
                .catch(e => {
                    console.log(e);
                    setLoading(false);
                    
                })
        }
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
                    <Input className="col-span-3" {...register('name', {
                        required: {
                            value: true,
                            message: 'Campo nome é obrigatório'
                        },
                        minLength: {
                            value: 3,
                            message: 'Nome deve ter no mínimo 3 caracteres'
                        },
                        pattern: {
                            value: /^[A-Za-zâãôõêéàÂÃÔÕÉÀ]+$/i,
                            message: 'Nome deve conter apenas letras'
                        }

                    })} id='name' />
                    {errors.name && <div className='text-red-600 mt-1 col-span-4'>{errors?.name?.message}</div>}
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="age">Idade</Label>
                    <Input className="col-span-3" id="age" {...register('age', {
                        required: {
                            value: true,
                            message: 'Campo idade é obrigatório'
                        },
                        min: {
                            value: 0,
                            message: 'Idade não pode ser negativa'
                        },
                        max: {
                            value: 100,
                            message: 'Idade muito alta'
                        },
                        pattern: {
                            value: /^[0-9]+$/i,
                            message: 'Idade deve ser um número válido'
                        }

                    })} />
                    {errors.age && <div className='text-red-600 mt-1 col-span-4'>{errors?.age?.message}</div>}
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="species">Espécie</Label>
                    <Input className="col-span-3" id="species" {...register('species', {
                        required: {
                            value: true,
                            message: 'Campo espécie é obrigatório'
                        },
                        minLength: {
                            value: 3,
                            message: 'Espécie deve ter no mínimo 3 caracteres'
                        },
                        pattern: {
                            value: /^[A-Za-zâãôõêéàÂÃÔÕÉÀ]+$/i,
                            message: 'Espécie deve conter apenas letras'
                        }

                    })} />
                    {errors.species && <div className='text-red-600 mt-1 col-span-4'>{errors?.species?.message}</div>}
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="breed">Raça</Label>
                    <Input className="col-span-3" id="breed" {...register('breed', {
                        required: {
                            value: true,
                            message: 'Campo raça é obrigatório'
                        },
                        minLength: {
                            value: 3,
                            message: 'Raça deve ter no mínimo 3 caracteres'
                        },
                        pattern: {
                            value: /^[A-Za-zâãôõêéàÂÃÔÕÉÀ]+$/i,
                            message: 'Raça deve conter apenas letras'
                        }

                    })} />
                    {errors.breed && <div className='text-red-600 mt-1 col-span-4'>{errors?.breed?.message}</div>}
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="description">Descrição</Label>
                    <Input className="col-span-3" id="description" {...register('description', {
                        required: {
                            value: true,
                            message: 'Campo descrição é obrigatório'
                        },
                        minLength: {
                            value: 10,
                            message: 'Descrição deve ter no mínimo 10 caracteres'
                        },

                    })} />
                    {errors.description && <div className='text-red-600 mt-1 col-span-4'>{errors?.description?.message}</div>}
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="characteristics">Características</Label>
                    <Input className="col-span-3" id="characteristics" {...register('characteristics', {
                        required: {
                            value: true,
                            message: 'Campo características é obrigatório'
                        },
                        minLength: {
                            value: 3,
                            message: 'Características deve ter no mínimo 3 caracteres'
                        },
                        pattern: {
                            value: /^[A-Za-zâãôõêéàÂÃÔÕÉÀ, ]+$/i,
                            message: 'Características deve conter apenas letras e vírgulas'
                        }
                    })} placeholder="Separe por vírgulas" />
                    {errors.characteristics && <div className='text-red-600 mt-1 col-span-4'>{errors?.characteristics?.message}</div>}
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="midia">Fotos/vídeos</Label>
                    <Input className="col-span-3" id="midia" multiple type="file" onChange={(e) => setValue("midia", e.target.files as FileList, { shouldValidate: false, })} />
                </div>
                {!hasImage && <p className='text-right text-l mt-1 text-red-600'>Precisa de pelo menos uma mídia</p>}
                {loading && <p className='text-right text-xl my-3 text-blue-500'>Carregando...</p>}
                

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