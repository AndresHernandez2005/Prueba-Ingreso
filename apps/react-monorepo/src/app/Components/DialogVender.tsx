import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import useFetchCarros, { Carro } from '../hooks/useFetchCarros';
import useFetchMotos, { Moto } from '../hooks/useFetchMotos';

interface DialogVenderProps {
  open: boolean;
  onClose: () => void;
  vehicle: Carro | Moto;
  vehicleType: 'carro' | 'moto';
}

const DialogVender: React.FC<DialogVenderProps> = ({
  open,
  onClose,
  vehicle,
  vehicleType,
}) => {
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');

  const { deleteCarro } = useFetchCarros();
  const { deleteMoto } = useFetchMotos();

  const handleSell = async () => {
    try {
      if (vehicleType === 'carro') {
        await deleteCarro(vehicle.id);
      } else {
        await deleteMoto(vehicle.id);
      }

      onClose();
    } catch (error) {
      console.error('Error al vender el vehículo:', error);
    }
  };

  const handleClose = () => {
    setNombre('');
    setDocumento('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Vender Vehículo</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre Comprador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Documento Comprador"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSell} color="primary">
          Vender
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogVender;
