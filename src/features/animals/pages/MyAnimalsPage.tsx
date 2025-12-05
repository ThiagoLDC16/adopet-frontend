import { useState } from 'react';
import { useMyAnimals } from '../hooks/useMyAnimals';
import { AnimalCard } from '../components/AnimalCard';
import { CreateAnimalDialogButton } from '../components/CreateAnimalDialogButton';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react'

export function MyAnimalsPage() {
  const { animals, loading, error, refetch } = useMyAnimals();
  const [petAdded, setPetAdded] = useState(true);

  setTimeout(() => {
    if (petAdded) {
      setPetAdded(false);
    }
  }, 5000);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg">Carregando meus animais...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-red-600">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="page-content">
      {petAdded && (
        <div className='flex justify-end'>
          <Alert className='bg-green-300 border-2 border-green-600 mt-2 flex justify-between items-center cursor-pointer max-w-2xs'
            onClick={() => setPetAdded(false)}>
            <AlertTitle>Animal cadastrado com sucesso!</AlertTitle>
            <X />
          </Alert>
        </div>
      )}
      <h1>Meus Animais</h1>

      <div className="sectionLabel">Meus pets cadastrados</div>
      <CreateAnimalDialogButton fetchMyAnimals={refetch} onAddAnimal={setPetAdded}/>


      {/* List */}
      <section className={`list mt-3 block ${animals && animals.animals.length > 0 ? "md:grid md:grid-cols-2" : ""} `} aria-label="Lista de meus animais">
        {animals?.animals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Você ainda não cadastrou nenhum animal</p>
          </div>
        ) : (
          animals?.animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} isMyAnimalsPage={true} fetchMyAnimals={refetch} />
          ))
        )}
      </section>
    </div>
  );
}