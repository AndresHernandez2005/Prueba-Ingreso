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
  tipo: string;
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
        return { nuevos: [response.data], usados: [] };
      });
      return response.data;
    } catch (error) {
      throw new Error('No se pudo agregar la nueva moto');
    }
  };

  const editMoto = async (motoId: number, updatedMoto: Moto) => {
    try {
      const response = await axios.put(`${apiMotosUrl}/${motoId}`, updatedMoto);
      queryClient.setQueryData<MotosData>(['motokey'], (oldData) => {
        if (oldData) {
          const updatedNuevos = oldData.nuevos.map((moto) =>
            moto.id === motoId ? response.data : moto
          );
          const updatedUsados = oldData.usados.map((moto) =>
            moto.id === motoId ? response.data : moto
          );
          return { nuevos: updatedNuevos, usados: updatedUsados };
        }
        return { nuevos: [], usados: [] };
      });
      return response.data;
    } catch (error) {
      throw new Error('No se pudo editar la moto');
    }
  };
  const deleteMoto = async (motoId: number) => {
    try {
      await axios.delete(`${apiMotosUrl}/${motoId}`);
      queryClient.setQueryData<MotosData>(['carrokey'], (oldData) => {
        if (oldData) {
          const updatedData = {
            ...oldData,
            nuevos: oldData.nuevos.filter((carro) => carro.id !== motoId),
            usados: oldData.usados.filter((carro) => carro.id !== motoId),
          };
          return updatedData;
        }
        return oldData;
      });
    } catch (error) {
      throw new Error('No se pudo eliminar el carro');
    }
  };

  return { motoData, isLoading, error, addMoto, editMoto, deleteMoto };
};

export default useFetchMotos;
