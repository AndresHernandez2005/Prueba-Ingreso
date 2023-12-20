import {
  Card,
  CardMedia,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SellIcon from '@mui/icons-material/Sell';
import useFetchMotos from '../hooks/useFetchMotos';
import useFetchCarros from '../hooks/useFetchCarros';

const CardVehiculo = () => {
  const { motoData } = useFetchMotos();
  const { carroData } = useFetchCarros();

  return (
    <>
      {motoData.map((moto, index) => (
        <Card variant="outlined" key={index} sx={{ marginTop: 2 }}>
          <Stack padding={2} gap={0.5}>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="h6">Modelo: {moto.modelo}</Typography>
              <Stack direction="row" gap={0.5}>
                <Tooltip title="Editar Vehiculo">
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Vender Vehiculo">
                  <IconButton color="error" size="small">
                    <SellIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <CardMedia
              component="img"
              height="195"
              image="/public/imagen-moto.jpg"
              alt="Imagen referencia"
            />
            <Typography>Color: {moto.color}</Typography>
            <Typography>
              Numero de Velocidades: {moto.numero_velocidades}
            </Typography>
            <Typography>Clindraje: {moto.cilindraje}</Typography>
            <Typography>Kilometraje: {moto.kilometraje}</Typography>
            <Typography>Valor: {moto.valor}</Typography>
            <Typography>Fecha de registro: {moto.fecha_registro}</Typography>
          </Stack>
        </Card>
      ))}
      {carroData.map((carro, index) => (
        <Card variant="outlined" key={index} sx={{ marginTop: 2 }}>
          <Stack padding={2}>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="h6">Modelo: {carro.modelo}</Typography>
              <Stack direction="row" gap={0.5}>
                <Tooltip title="Editar Vehiculo">
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Vender Vehiculo">
                  <IconButton color="error" size="small">
                    <SellIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <CardMedia
              component="img"
              image="./public/imagen-carro.webp"
              alt="Imagen referencia"
              sx={{ height: 150 }}
            />
            <Typography>Color: {carro.color}</Typography>
            <Typography>Kilometraje: {carro.kilometraje}</Typography>
            <Typography>Color: {carro.valor}</Typography>
            <Typography>Fecha de registro: {carro.fecha_registro}</Typography>
          </Stack>
        </Card>
      ))}
    </>
  );
};

export default CardVehiculo;
