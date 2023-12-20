import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
export interface Carro {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  valor: number;
  fecha_registro: string;
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
          return {
            ...oldData,
            nuevos: [...oldData.nuevos, response.data],
          };
        }
        return oldData;
      });
      return response.data;
    } catch (error) {
      throw new Error('No se pudo agregar el nuevo carro');
    }
  };

  return { carroData, isLoading, error, addCarro };
};

export default useFetchCarros;
