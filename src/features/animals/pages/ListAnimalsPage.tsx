import { useAnimals } from '../hooks/useAnimals';
import { AnimalCard } from '../components/AnimalCard';

export function ListAnimalsPage() {
  const { animals, loading, error } = useAnimals();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg">Carregando animais...</div>
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
      <h1>Animais</h1>

      <div className="sectionLabel">Pets disponíveis na região</div>

      {/* List */}
      <section className="list" aria-label="Lista de animais">
        {animals?.animals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum animal encontrado</p>
          </div>
        ) : (
          animals?.animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} isMyAnimalsPage={false} />
          ))
        )}
      </section>
    </div>
  );
}