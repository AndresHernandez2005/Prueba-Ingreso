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

interface DialogRegistroProps {
  open: boolean;
  onClose: () => void;
}

const DialogRegistro: React.FC<DialogRegistroProps> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  const [vehicleType, setVehicleType] = useState('');
  const [formData, setFormData] = useState({
    modelo: '',
    color: '',
    kilometraje: '',
    valor: '',
    fechaRegistro: '',
    cilindraje: '',
    numVelocidades: '',
  });
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
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
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
        <Button onClick={handleClose}>Registrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogRegistro;
