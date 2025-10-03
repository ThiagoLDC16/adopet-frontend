import { api } from "@/lib/api";
import { useEffect, useState } from "react";

type Char = {
    animalId: number,
    characteristicId: number
    characteristic: {
        id: number,
        description: string,
    }
}

type Midia = {
    animalId: number,
    extension: string,
    id: number,
    type: string,
    url: string,
}

type AnimalData = {
    animal: {
        age: number,
        breed: string,
        description: string,
        id: number,
        name: string,
        responsibleNGOId: number,
        species: string,
        adopterUserId?: number,
        characteristics: Array<Char>
        midia: Array<Midia>
    }

}

export function useData(url: string) {
    const [data, setData] = useState<AnimalData>();

    useEffect(() => {
        let ignore = false;
        api.get<AnimalData>(url)
            .then(response => {
                if (!ignore) {
                    setData(response.data);
                }
            });
        return () => {
            ignore = true;
        };
    }, [url]);
    if (data) return data.animal;
}