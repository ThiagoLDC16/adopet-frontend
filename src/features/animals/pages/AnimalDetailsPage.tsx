import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNavigate, useParams } from 'react-router-dom';
import { useAnimal } from '../hooks/useAnimal';
import { getImageUrl } from '@/lib/getImageURL';
import { useState } from 'react';
import { WhatsappButton } from '../components/WhatsappButton';
import { ShareButton } from '../components/ShareButton';
import { AnimalMidiasCarousel } from '../components/AnimalMidiasCarousel';


export function AnimalDetailsPage() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { animal, loading, error } = useAnimal(Number(id))

    const [open, setOpen] = useState<boolean>(true)

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setOpen(false)
            setTimeout(() => {
                navigate(-1);
            }, 300)
        }
    };

    const findPhotoOrNull = () => {
        const photo = animal?.midia.find(item => item.type === "image")
        if (!photo) return null
        return photo
    }


    return (
        <div className="page-content">
            <h1>Animais</h1>
            <form className="searchRow">
                <input
                    type="text"
                    className="input"
                    placeholder="Pesquisar"
                    aria-label="Pesquisar animais"

                />

                <button type="button" className="btn">Ordenar</button>
            </form>
            <Sheet open={open} onOpenChange={handleOpenChange}>
                <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl bg-secondary ">

                    {/* fiz a verificação de loading e error aqui dentro pra ele poder renderizar o efeito da pagina subindo */}

                    {loading &&
                        (<div className="flex justify-center items-center min-h-96">
                            <div className="text-lg">Carregando animal...</div>
                        </div>)}

                    {error ?
                        (<div className="flex justify-center items-center min-h-96">
                            <div className="text-red-600">Erro: {error}</div>
                        </div>) :
                        <>
                            <SheetHeader className='max-w-4xl w-full mx-auto'>
                                <SheetTitle>Detalhes do pet</SheetTitle>
                            </SheetHeader>
                            <div className='px-4 max-w-4xl w-full mx-auto'>
                                <div className="flex items-stretch justify-center gap-2 mb-4">
                                    <div className="flex-1 overflow-hidden rounded-md max-h-[200px] object-center">
                                        {findPhotoOrNull() ? (
                                            <img
                                                className="w-full h-full object-cover object-center"
                                                src={getImageUrl(findPhotoOrNull()?.url) ?? "/"}
                                                alt={animal?.name ?? "Animal"}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 border-gray-400 border-[1px] rounded-md">
                                                Sem foto
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex-1 text-primary text-lg p-4 bg-background rounded-md divide-y divide-accent-foreground/10'>
                                        <p className='font-bold'>{animal?.name}</p>
                                        <p className='text-sm'>{animal?.breed}</p>
                                        <p className='text-sm'>{animal?.age} {animal?.age === 1 ? "ano" : "anos"}</p>
                                        <p className='text-sm'>{animal?.characteristics.map((item, index) => {
                                            const finalItem = index + 1 === animal?.characteristics.length
                                            return item.characteristic.description + (finalItem ? " " : ", ")
                                        })}</p>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center p-4 bg-background rounded-md">
                                        <p className='text-center'>
                                            {animal?.description}

                                        </p>
                                    </div>
                                </div>

                                <div className='flex justify-start items-center gap-2 mb-4'>
                                    <WhatsappButton phone={animal?.responsibleNGO.phone} />
                                    <ShareButton title={`Conheça o ${animal?.name}`} text={`${animal?.name} parece ser um ótimo animal para adoção!`} url={window.location.href} />
                                </div>


                                <AnimalMidiasCarousel midias={animal?.midia ?? []} name={animal?.name ?? ""} />

                            </div>

                        </>


                    }


                </SheetContent>
            </Sheet>
        </div>

    );
}