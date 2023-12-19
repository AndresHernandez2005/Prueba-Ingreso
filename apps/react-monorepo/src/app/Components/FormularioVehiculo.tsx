import { Grid, TextField } from '@mui/material';

interface VehicleProps {
  tipoVehiculo: string;
  formData: {
    modelo: string;
    color: string;
    kilometraje: string;
    valor: string;
    fechaRegistro: string;
    cilindraje: string;
    numVelocidades: string;
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
          label="Modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Kilometraje"
          name="kilometraje"
          value={formData.kilometraje}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Valor"
          name="valor"
          value={formData.valor}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Fecha de Registro"
          name="fechaRegistro"
          value={formData.fechaRegistro}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>

      {tipoVehiculo === 'moto' && (
        <>
          <Grid item xs={6}>
            <TextField
              label="Cilindraje"
              name="cilindraje"
              value={formData.cilindraje}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
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
