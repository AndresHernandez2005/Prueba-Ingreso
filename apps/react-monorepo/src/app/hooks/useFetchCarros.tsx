import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
export interface Carro {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  valor: number;
  fecha_registro: string;
  tipo: string;
}

export interface CarrosData {
  nuevos: Carro[];
  usados: Carro[];
}

const useFetchCarros = () => {
  const apiCarrosUrl = 'http://localhost:3000/carros';

  const queryClient = useQueryClient();
  const {
    data: { nuevos = [], usados = [] } = {},
    isLoading,
    error,
  } = useQuery<CarrosData>({
    queryKey: ['carrokey'],
    queryFn: async () => {
      const response = await axios.get(apiCarrosUrl);
      return response.data;
    },
  });
  const carroData = [...nuevos, ...usados];

  const addCarro = async (newCarro: Carro) => {
    try {
      const response = await axios.post(apiCarrosUrl, newCarro);
      queryClient.setQueryData<CarrosData>(['carrokey'], (oldData) => {
        if (oldData) {
          const isNuevo = newCarro.kilometraje === 0;
          const updatedData = {
            ...oldData,
            nuevos: isNuevo
              ? [...oldData.nuevos, response.data]
              : oldData.nuevos,
            usados: !isNuevo
              ? [...oldData.usados, response.data]
              : oldData.usados,
          };
          return updatedData;
        }
        return { nuevos: [response.data], usados: [] };
      });
      return response.data;
    } catch (error) {
      throw new Error('No se pudo agregar el nuevo carro');
    }
  };

  const editCarro = async (carroId: number, updatedCarro: Carro) => {
    try {
      const response = await axios.put(
        `${apiCarrosUrl}/${carroId}`,
        updatedCarro
      );
      queryClient.setQueryData<CarrosData>(['carrokey'], (oldData) => {
        if (oldData) {
          const updatedNuevos = oldData.nuevos.map((carro) =>
            carro.id === carroId ? response.data : carro
          );
          const updatedUsados = oldData.usados.map((carro) =>
            carro.id === carroId ? response.data : carro
          );
          return { nuevos: updatedNuevos, usados: updatedUsados };
        }
        return { nuevos: [], usados: [] };
      });
      return response.data;
    } catch (error) {
      throw new Error('No se pudo editar el carro');
    }
  };

  const deleteCarro = async (carroId: number) => {
    try {
      await axios.delete(`${apiCarrosUrl}/${carroId}`);
      queryClient.setQueryData<CarrosData>(['carrokey'], (oldData) => {
        if (oldData) {
          const updatedData = {
            ...oldData,
            nuevos: oldData.nuevos.filter((carro) => carro.id !== carroId),
            usados: oldData.usados.filter((carro) => carro.id !== carroId),
          };
          return updatedData;
        }
        return oldData;
      });
    } catch (error) {
      throw new Error('No se pudo eliminar el carro');
    }
  };

  return { carroData, isLoading, error, addCarro, editCarro, deleteCarro };
};

export default useFetchCarros;
