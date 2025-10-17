import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { reportService } from '../services/report.service';

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/features/auth/contexts/AuthContext';
import type { CreateReportData } from '../types/report.types';

export function CreateReportDialog() {
    const { register, handleSubmit, setValue, reset } = useForm<CreateReportData>()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth()

    async function handleCreateReport(data: CreateReportData) {
        setIsSubmitting(true);
        setError(null);
        
        try {
            await reportService.createReport({ ...data, user });
            setSuccess(true);
            reset();
            
            // Fechar o diálogo após 2 segundos
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao registrar denúncia. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    }

return (
        <DialogContent className="max-w-lg">
            <DialogHeader className="text-left">
                <DialogTitle>Nova denúncia</DialogTitle>
                <DialogDescription>Registre uma nova denúncia</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleCreateReport)} className="space-y-6">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Descrição</Label>
                    <Input 
                        className="col-span-3" 
                        {...register('description', { required: 'Descrição é obrigatória' })} 
                        id='description' 
                        placeholder='Descreva o acontecimento' 
                    />
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="details" className="text-right pt-2">Detalhes</Label>
                    <textarea
                        className="col-span-3 min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        id="details" 
                        {...register('details', { required: 'Detalhes são obrigatórios' })} 
                        placeholder='Foque nos detalhes específicos do ocorrido'
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ocurrenceDate" className="text-right">Data</Label>
                    <input 
                        className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        type="date" 
                        id="ocurrenceDate" 
                        {...register("ocurrenceDate", { 
                            required: 'Data é obrigatória',
                            valueAsDate: true 
                        })} 
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Local</Label>
                    <Input 
                        className="col-span-3" 
                        id="location" 
                        {...register('location', { required: 'Localização é obrigatória' })}
                        placeholder='Endereço ou localização aproximada' 
                    />
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="midia" className="text-right pt-2">Mídias</Label>
                    <div className="col-span-3">
                        <Input 
                            id="midia" 
                            multiple 
                            type="file" 
                            accept="image/*,video/*"
                            onChange={(e) => setValue("midia", e.target.files as FileList, { shouldValidate: false })} 
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Fotos e vídeos que ajudem a comprovar a denúncia
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                        Denúncia registrada com sucesso!
                    </div>
                )}

                <DialogFooter className="flex-row justify-end gap-2 mt-6">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="px-6">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button 
                        type="submit" 
                        disabled={isSubmitting || success}
                        className="px-8"
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar denúncia'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}