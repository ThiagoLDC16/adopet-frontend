import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { api } from '@/lib/api';

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/features/auth/contexts/AuthContext';
import type { User } from '@/features/auth/types';



type reportSchemaProps = {
    description: string,
    details: string,
    ocurrenceDate: Date
    location: string,
    midia: FileList
    user?: User
}

export function CreateReportDialog() {
    const { register, handleSubmit, setValue } = useForm<reportSchemaProps>()

    const [display, setDisplay] = useState(false);
    const { user } = useAuth()



    async function handleCreateReport(data: reportSchemaProps) {
        const formData = new FormData()
        formData.append("description", data.description)
        formData.append("details", data.details)
        formData.append("ocurrenceDate", new Date(data.ocurrenceDate).toISOString())
        formData.append("location", data.location)

        for (let i = 0; i < data.midia.length; i++) {
            formData.append("midia", data.midia[i])
        }

        if (user) formData.append("user", JSON.stringify(user))

        try {
            api.post("/api/report/register", formData)
            console.log(formData)
            setDisplay(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DialogContent>
            <DialogHeader className="text-left">
                <DialogTitle>Nova denúncia</DialogTitle>
                <DialogDescription>Registre uma nova denúncia</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleCreateReport)} className="space y-6">
                <div className="grid grid-cols-4">
                    <Label htmlFor="descriptioon">Descrição</Label>
                    <Input className="col-span-3" {...register('description')} id='description' placeholder='Descreve o acontecimento' />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="details">Detalhes</Label>
                    <Input className="col-span-3" id="details" {...register('details')} placeholder='Foque nos detalhes específicos' />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="ocurrenceDate">Data de ocorrência</Label>
                    <input className="col-span-3" type="date" id="ocurrenceDate" {...register("ocurrenceDate", { valueAsDate: true })} />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="location">Localização</Label>
                    <Input className="col-span-3" id="location" {...register('location')} />
                </div>

                <div className="pt-4 grid grid-cols-4">
                    <Label htmlFor="midia">Fotos/vídeos</Label>
                    <Input className="col-span-3" id="midia" multiple type="file" onChange={(e) => setValue("midia", e.target.files as FileList, { shouldValidate: false, })} />
                </div>

                {display && <p className='text-right text-xl my-3 text-green-500'>Denúncia registrada!</p>}

                <DialogFooter className="flex-row justify-end mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" className="px-6">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" variant="default" className="px-8">Enviar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}