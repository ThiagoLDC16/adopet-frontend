import { api } from '@/lib/api';
import type { Animal, AnimalListResponse, AnimalFilters, CreateAnimalData, UpdateAnimalData } from '../types/animal.types';

export const animalService = {
  async getAnimals(filters: AnimalFilters = {}): Promise<AnimalListResponse> {
    const response = await api.get('/api/animals', { params: filters });
    return response.data;
  },

  async getAnimalById(id: number): Promise<Animal> {
    const response = await api.get(`/api/animals/${id}`);
    return response.data;
  },

  async createAnimal(data: CreateAnimalData): Promise<Animal> {
    const response = await api.post('/api/animals', data);
    return response.data;
  },

  async updateAnimal(id: number, data: UpdateAnimalData): Promise<Animal> {
    const response = await api.put(`/api/animals/${id}`, data);
    return response.data;
  },

  async deleteAnimal(id: number): Promise<void> {
    await api.delete(`/api/animals/${id}`);
  },

  async getMyAnimals(filters: AnimalFilters = {}): Promise<AnimalListResponse> {
    const response = await api.get('/api/animals/my/animals', { params: filters });
    return response.data;
  }
};