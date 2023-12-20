import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import FormularioVehiculo from './FormularioVehiculo';
import useFetchMotos, { Moto } from '../hooks/useFetchMotos';
import useFetchCarros, { Carro } from '../hooks/useFetchCarros';

interface DialogRegistroProps {
  open: boolean;
  onClose: () => void;
}

const DialogRegistro: React.FC<DialogRegistroProps> = ({ open, onClose }) => {
  const { addMoto } = useFetchMotos();
  const { addCarro } = useFetchCarros();

  const [vehicleType, setVehicleType] = useState('');
  const [formData, setFormData] = useState({
    modelo: '',
    color: '',
    kilometraje: 0,
    valor: 0,
    fechaRegistro: '',
    cilindraje: 0,
    numVelocidades: 0,
  });

  const handleClose = () => {
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVehicleTypeChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setVehicleType(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (vehicleType === 'moto') {
        const newMoto: Moto = {
          id: 0,
          ...formData,
          fecha_registro: '',
          numero_velocidades: 0,
        };
        await addMoto(newMoto);
      } else if (vehicleType === 'carro') {
        const newCarro: Carro = {
          id: 0,
          ...formData,
          fecha_registro: '',
        };
        await addCarro(newCarro);
      }
      handleClose();
    } catch (error) {
      console.error('Error al agregar el vehículo:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Formulario de registro</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingInline: 3,
          gap: 2,
        }}
      >
        <DialogContentText variant="subtitle2">
          Ingrese la informacion del vehiculo que sera registrado en los campos:
        </DialogContentText>
        <Stack onSubmit={handleSubmit} spacing={0.5}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Vehículo</InputLabel>
            <Select
              label="Tipo de Vehículo"
              value={vehicleType}
              onChange={handleVehicleTypeChange}
              fullWidth
            >
              <MenuItem value="carro">Carro</MenuItem>
              <MenuItem value="moto">Moto</MenuItem>
            </Select>
          </FormControl>
          <FormularioVehiculo
            tipoVehiculo={vehicleType}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Registrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogRegistro;
