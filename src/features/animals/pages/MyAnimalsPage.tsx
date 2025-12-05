import { useMyAnimals } from '../hooks/useMyAnimals';
import { AnimalCard } from '../components/AnimalCard';
import { CreateAnimalDialogButton } from '../components/CreateAnimalDialogButton';

export function MyAnimalsPage() {
  const { animals, loading, error, refetch } = useMyAnimals();

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

  // const filterChips = getFilterChips();

  return (
    <div className="page-content">
      <h1>Meus Animais</h1>

      <div className="sectionLabel">Meus pets cadastrados</div>
      <CreateAnimalDialogButton fetchMyAnimals={refetch}/>

      {/* List */}
      <section className={`list mt-3 block ${animals && animals.animals.length > 0 ? "md:grid md:grid-cols-2" : ""} `} aria-label="Lista de meus animais">
        {animals?.animals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Você ainda não cadastrou nenhum animal</p>
          </div>
        ) : (
          animals?.animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} isMyAnimalsPage={true} fetchMyAnimals={refetch}/>
          ))
        )}
      </section>
    </div>
  );
}