import type { Animal } from '../types/animal.types';
import { Link } from 'react-router-dom';

interface AnimalCardProps {
  animal: Animal;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  const getSpeciesName = (species: string) => {
    switch (species) {
      case 'DOG': return 'Cachorro';
      case 'CAT': return 'Gato';
      case 'BIRD': return 'Pássaro';
      case 'RODENT': return 'Roedor';
      case 'OTHER': return 'Outro';
      default: return species;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DISPONIVEL': return 'Disponível';
      case 'ADOTADO': return 'Adotado';
      case 'EM_PROCESSO': return 'Em processo';
      default: return status;
    }
  };

  return (
    <article className="card">
      <Link to={`/animals/${animal.id}`}>
        {animal.images && animal.images.length > 0 ? (
          <img
            src={animal.images[0]}
            alt={animal.name || 'Animal'}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sem foto
          </div>
        )}
      </Link>
      <div className="meta">
        <b>{animal.name || 'Sem nome'}</b>
        <small>
          {getSpeciesName(animal.species) || 'Espécie não informada'} 
          {animal.breed && ` • ${animal.breed}`}
          {animal.age && ` • ${animal.age} anos`}
        </small>
        <small>{animal.description || 'Sem descrição disponível'}</small>
        <small>
          {animal.city || 'Cidade não informada'}, {animal.state || 'UF não informada'}
          {animal.status && ` • ${getStatusText(animal.status)}`}
        </small>
      </div>
    </article>
  );
}