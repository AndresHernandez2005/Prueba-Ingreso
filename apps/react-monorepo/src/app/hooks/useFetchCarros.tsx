import { useEffect, useState } from 'react';
import axios from 'axios';

interface Carro {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  valor: number;
  fecha_registro: string;
}

interface CarrosData {
  nuevos: Carro[];
  usados: Carro[];
}

const useFetchCarros = () => {
  const [carrosData, setCarrosData] = useState<CarrosData>({
    nuevos: [],
    usados: [],
  });
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<null | any>(null);

  const apiCarrosUrl = 'http://localhost:3000/carros';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiCarrosUrl);
        const data = response.data;
        setCarrosData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos de carros:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateCarro = async (
    tipo: 'nuevos' | 'usados',
    carroId: number,
    newData: Partial<Carro>
  ) => {
    try {
      await axios.patch(`${apiCarrosUrl}/${tipo}/${carroId}`, newData);

      setCarrosData((prevData) => ({
        ...prevData,
        [tipo]: prevData[tipo].map((carro) =>
          carroId === carro.id ? { ...carro, ...newData } : carro
        ),
      }));
    } catch (error) {
      console.error('Error al actualizar el carro:', error);
    }
  };

  const addCarro = async (
    tipo: 'nuevos' | 'usados',
    newCarroData: Omit<Carro, 'fecha_registro'>
  ) => {
    try {
      const response = await axios.post(
        `${apiCarrosUrl}/${tipo}`,
        newCarroData
      );

      setCarrosData((prevData) => ({
        ...prevData,
        [tipo]: [...prevData[tipo], response.data],
      }));
    } catch (error) {
      console.error('Error al agregar el carro:', error);
    }
  };

  const deleteCarro = async (tipo: 'nuevos' | 'usados', carroId: number) => {
    try {
      await axios.delete(`${apiCarrosUrl}/${tipo}/${carroId}`);

      setCarrosData((prevData) => ({
        ...prevData,
        [tipo]: prevData[tipo].filter((carro) => carro.id !== carroId),
      }));
    } catch (error) {
      console.error('Error al eliminar el carro:', error);
    }
  };

  return { carrosData, loading, error, updateCarro, addCarro, deleteCarro };
};

export default useFetchCarros;
