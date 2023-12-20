import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
export interface Moto {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  valor: number;
  fecha_registro: string;
  cilindraje: number;
  numero_velocidades: number;
}

export interface MotosData {
  nuevos: Moto[];
  usados: Moto[];
}

const useFetchMotos = () => {
  const apiMotosUrl = 'http://localhost:3000/motos';

  const queryClient = useQueryClient();
  const {
    data: { nuevos = [], usados = [] } = {},
    isLoading,
    error,
  } = useQuery<MotosData>({
    queryKey: ['motokey'],
    queryFn: async () => {
      const response = await axios.get(apiMotosUrl);
      return response.data;
    },
  });
  const motoData = [...nuevos, ...usados];

  const addMoto = async (newMoto: Moto) => {
    try {
      const response = await axios.post(apiMotosUrl, newMoto);
      queryClient.setQueryData<MotosData>(['motokey'], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            nuevos: [...oldData.nuevos, response.data],
          };
        }
        return oldData;
      });
      return response.data;
    } catch (error) {
      throw new Error('No se pudo agregar la nueva moto');
    }
  };

  return { motoData, isLoading, error, addMoto };
};

export default useFetchMotos;
