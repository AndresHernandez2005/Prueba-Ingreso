import { useState } from 'react';
import { Button, ButtonGroup, Card, Stack } from '@mui/material';
import DialogRegistro from './DialogRegistro';

const Navegation = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card sx={{ marginTop: 2, padding: 2 }}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Publicados</Button>
          <Button>Precios</Button>
        </ButtonGroup>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenDialog}
        >
          Registrar
        </Button>
        <DialogRegistro open={openDialog} onClose={handleCloseDialog} />
      </Stack>
    </Card>
  );
};

export default Navegation;
