import { useState, useEffect } from 'react';
import type{ AnimalListResponse, AnimalFilters } from '../types/animal.types';
import { animalService } from '../services/animal.service';

export function useAnimals(initialFilters: AnimalFilters = {}) {
  const [animals, setAnimals] = useState<AnimalListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AnimalFilters>(initialFilters);

  const fetchAnimals = async (newFilters?: AnimalFilters) => {
    setLoading(true);
    setError(null);
    try {
      const filtersToUse = newFilters || filters;
      const data = await animalService.getAnimals(filtersToUse);
      setAnimals(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao buscar animais');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const updateFilters = (newFilters: AnimalFilters) => {
    setFilters(newFilters);
    fetchAnimals(newFilters);
  };

  return {
    animals,
    loading,
    error,
    filters,
    updateFilters,
    refetch: () => fetchAnimals(),
  };
}