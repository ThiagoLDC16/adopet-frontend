import { useState, useEffect } from 'react';
import type { Animal } from '../types/animal.types';
import { animalService } from '../services/animal.service';

export function useAnimal(id: number) {
    const [animal, setAnimal] = useState<Animal | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {

        if (!id) {
            setLoading(false);
            return;
        }

        const fetchAnimal = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await animalService.getAnimalByIdFixed(Number(id));
                setAnimal(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Erro ao buscar animal');
                setAnimal(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimal();
    }, [id]);

    return {
        animal,
        loading,
        error,
    };
}