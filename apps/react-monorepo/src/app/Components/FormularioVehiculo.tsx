import React from 'react';
import { Grid, TextField } from '@mui/material';

interface VehicleProps {
  tipoVehiculo: string;
  formData: {
    modelo: string;
    color: string;
    kilometraje: number;
    valor: number;
    fecha_registro: string;
    cilindraje: number;
    numVelocidades: number;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormularioVehiculo: React.FC<VehicleProps> = ({
  tipoVehiculo,
  formData,
  handleInputChange,
}) => {
  return (
    <Grid container rowSpacing={0.5}>
      <Grid item xs={6}>
        <TextField
          required
          label="Modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          label="Color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          label="Kilometraje"
          name="kilometraje"
          value={formData.kilometraje}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          label="Valor"
          name="valor"
          value={formData.valor}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          label="Fecha de Registro"
          name="fecha_registro"
          value={formData.fecha_registro}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      {tipoVehiculo === 'moto' && (
        <>
          <Grid item xs={6}>
            <TextField
              required
              label="Cilindraje"
              name="cilindraje"
              value={formData.cilindraje}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              label="Número de Velocidades"
              name="numVelocidades"
              value={formData.numVelocidades}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default FormularioVehiculo;
