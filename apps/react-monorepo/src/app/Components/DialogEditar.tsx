import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import useFetchCarros, { Carro } from '../hooks/useFetchCarros';
import useFetchMotos, { Moto } from '../hooks/useFetchMotos';

interface DialogEditarProps {
  open: boolean;
  onClose: () => void;
  vehiculo: Carro | Moto | null;
}

const DialogEditar: React.FC<DialogEditarProps> = ({
  open,
  onClose,
  vehiculo,
}) => {
  const [editedData, setEditedData] = useState<Carro | Moto | null>(vehiculo);
  const { editCarro } = useFetchCarros();
  const { editMoto } = useFetchMotos();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedData) {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  const handleEditVehiculo = async () => {
    try {
      if (editedData && editedData.tipo === 'carro') {
        await editCarro(editedData.id, editedData as Carro);
      } else if (editedData && editedData.tipo === 'moto') {
        await editMoto(editedData.id, editedData as Moto);
      }
      onClose();
    } catch (error) {
      console.error('Error al editar vehículo:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Vehículo</DialogTitle>
      <DialogContent>
        <TextField
          label="Modelo"
          name="modelo"
          value={editedData?.modelo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleEditVehiculo}>Guardar Cambios</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditar;
