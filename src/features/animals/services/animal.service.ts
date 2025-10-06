import { api } from '@/lib/api';
import type { Animal, AnimalListResponse, AnimalFilters, CreateAnimalData, UpdateAnimalData } from '../types/animal.types';

export const animalService = {
  async getAnimals(filters: AnimalFilters = {}): Promise<AnimalListResponse> {
    const response = await api.get('/api/animal/', { params: filters });
    return response.data;
  },

  async getAnimalById(id: number): Promise<Animal> {
    const response = await api.get(`/api/animal/${id}`);

    return response.data;
  },
  async getAnimalByIdFixed(id: number): Promise<Animal> {
    const response = await api.get(`/api/animal/${id}`);

    return response.data.animal.animal;
  },

  async createAnimal(data: CreateAnimalData): Promise<Animal> {
    const response = await api.post('/api/animal/', data);
    return response.data;
  },

  async updateAnimal(id: number, data: UpdateAnimalData): Promise<Animal> {
    const response = await api.put(`/api/animal/${id}`, data);
    return response.data;
  },

  async deleteAnimal(id: number): Promise<void> {
    await api.delete(`/api/animal/${id}`);
  },

  async getMyAnimals(filters: AnimalFilters = {}): Promise<AnimalListResponse> {
    const response = await api.get('/api/animal/my', { params: filters });
    return response.data;
  }
};