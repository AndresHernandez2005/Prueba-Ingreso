import { useState } from 'react';
import { Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SellIcon from '@mui/icons-material/Sell';
import useFetchMotos, { Moto } from '../hooks/useFetchMotos';
import useFetchCarros, { Carro } from '../hooks/useFetchCarros';
import DialogEditar from './DialogEditar';
import DialogVender from './DialogVender';

const CardVehiculo = () => {
  const { motoData } = useFetchMotos();
  const { carroData } = useFetchCarros();

  const [openDialog, setOpenDialog] = useState(false);
  const [openSellDialog, setOpenSellDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Carro | Moto>();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOpenSellDialog = (vehicle: Carro | Moto) => {
    setSelectedVehicle(vehicle);
    setOpenSellDialog(true);
  };

  const handleCloseSellDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {carroData.map((carro, index) => (
        <Card variant="outlined" key={index} sx={{ marginTop: 2 }}>
          <Stack padding={2}>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="h6">Modelo: {carro.modelo}</Typography>
              <Stack direction="row" gap={0.5}>
                <Tooltip title="Editar Vehiculo">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={handleOpenDialog}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <DialogEditar
                  open={openDialog}
                  onClose={handleCloseDialog}
                  vehiculo={carro}
                />
                <Tooltip title="Vender Vehiculo">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleOpenSellDialog(carro)}
                  >
                    <SellIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <img
              src="/imagen-carro.webp"
              alt="Imagen referencia"
              style={{ height: 200, width: 300 }}
            />
            <Typography>Color: {carro.color}</Typography>
            <Typography>Kilometraje: {carro.kilometraje}</Typography>
            <Typography>Color: {carro.valor}</Typography>
            <Typography>Fecha de registro: {carro.fecha_registro}</Typography>
          </Stack>
        </Card>
      ))}
      {motoData.map((moto, index) => (
        <Card variant="outlined" key={index} sx={{ marginTop: 2 }}>
          <Stack padding={2} gap={0.5}>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="h6">Modelo: {moto.modelo}</Typography>
              <Stack direction="row" gap={0.5}>
                <Tooltip title="Editar Vehiculo">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={handleOpenDialog}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <DialogEditar
                  open={openDialog}
                  onClose={handleCloseDialog}
                  vehiculo={moto}
                />
                <Tooltip title="Vender Vehiculo">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleOpenSellDialog(moto)}
                  >
                    <SellIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <img
              src="/imagen-moto.jpg"
              alt="Imagen referencia"
              style={{ height: 200, width: 300 }}
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
      {selectedVehicle && (
        <DialogVender
          open={openSellDialog}
          onClose={handleCloseSellDialog}
          vehicle={selectedVehicle}
          vehicleType={selectedVehicle.tipo === 'carro' ? 'carro' : 'moto'}
        />
      )}
    </>
  );
};

export default CardVehiculo;
