import { useState } from 'react';
import { useMyAnimals } from '../hooks/useMyAnimals';
import { AnimalCard } from '../components/AnimalCard';
import { AnimalFilters } from '../components/AnimalFilters';
import type { AnimalFilters as IAnimalFilters } from '../types/animal.types';
import { CreateAnimalDialogButton } from '../components/CreateAnimalDialogButton';

export function MyAnimalsPage() {
  const { animals, loading, error, filters, updateFilters } = useMyAnimals();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ ...filters, breed: searchTerm });
  };

  const clearSearch = () => {
    setSearchTerm('');
    updateFilters({ ...filters, breed: undefined });
  };

  const getFilterChips = () => {
    const chips = [];
    if (filters.species) {
      const speciesNames = {
        DOG: 'Cachorros',
        CAT: 'Gatos',
        BIRD: 'Aves',
        RODENT: 'Roedores',
        OTHER: 'Outros'
      };
      chips.push({ label: speciesNames[filters.species as keyof typeof speciesNames], key: 'species' });
    }
    if (filters.breed) {
      chips.push({ label: `Raça: ${filters.breed}`, key: 'breed' });
    }
    if (filters.location) {
      chips.push({ label: `Local: ${filters.location}`, key: 'location' });
    }
    return chips;
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key as keyof IAnimalFilters];
    updateFilters(newFilters);
  };

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

  const filterChips = getFilterChips();

  return (
    <div className="page-content">
      <h1>Meus Animais</h1>

      {/* Search + actions */}
      <form className="searchRow" onSubmit={handleSearch}>
        <input 
          type="text"
          className="input" 
          placeholder="Pesquisar" 
          aria-label="Pesquisar meus animais"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AnimalFilters
          filters={filters}
          onFiltersChange={updateFilters}
        />
        <button type="button" className="btn">Ordenar</button>
      </form>

      {/* Chips ativos */}
      {filterChips.length > 0 && (
        <div className="chips" aria-label="Filtros ativos">
          {filterChips.map((chip) => (
            <span 
              key={chip.key} 
              className="chip" 
              onClick={() => removeFilter(chip.key)}
              style={{ cursor: 'pointer' }}
            >
              {chip.label} ×
            </span>
          ))}
        </div>
      )}

      <div className="sectionLabel">Meus pets cadastrados</div>
      <CreateAnimalDialogButton />

      {/* List */}
      <section className="list mt-3" aria-label="Lista de meus animais">
        {animals?.animals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Você ainda não cadastrou nenhum animal</p>
          </div>
        ) : (
          animals?.animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))
        )}
      </section>
    </div>
  );
}