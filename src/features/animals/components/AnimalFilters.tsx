import { useState } from 'react';
import type { AnimalFilters as IAnimalFilters, AnimalSpecies } from '../types/animal.types';

interface AnimalFiltersProps {
  filters: IAnimalFilters;
  onFiltersChange: (filters: IAnimalFilters) => void;
}

export function AnimalFilters({ filters, onFiltersChange }: AnimalFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterSelect = (type: keyof IAnimalFilters, value: string) => {
    const newFilters = { ...filters, [type]: value || undefined };
    onFiltersChange(newFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <>
      <details className="filter" open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary className="btn">Filtrar</summary>
        <div className="menu" role="menu" aria-label="Filtros">
          <button 
            role="menuitem" 
            onClick={() => handleFilterSelect('species', 'DOG')}
          >
            Cachorros
          </button>
          <button 
            role="menuitem" 
            onClick={() => handleFilterSelect('species', 'CAT')}
          >
            Gatos
          </button>
          <button 
            role="menuitem" 
            onClick={() => handleFilterSelect('species', 'BIRD')}
          >
            Aves
          </button>
          <button 
            role="menuitem" 
            onClick={() => handleFilterSelect('species', 'RODENT')}
          >
            Roedores
          </button>
          <button 
            role="menuitem" 
            onClick={() => handleFilterSelect('species', 'OTHER')}
          >
            Outros
          </button>
          {hasActiveFilters && (
            <button 
              role="menuitem" 
              onClick={clearFilters}
              style={{ borderTop: '1px solid var(--btn-bd)', marginTop: '4px', paddingTop: '12px' }}
            >
              Limpar filtros
            </button>
          )}
        </div>
      </details>
    </>
  );
}