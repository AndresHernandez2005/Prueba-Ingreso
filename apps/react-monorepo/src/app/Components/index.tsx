import { Box, Stack } from '@mui/material';
import Header from './Header';
import Navegation from './Navegation';
import ListaVehiculos from './ListaVehiculos';

const Home = () => {
  return (
    <>
      <Header />
      <Box paddingInline={2} marginTop={6}>
        <Stack direction={'column'} gap={2}>
          <Navegation />
          <ListaVehiculos />
        </Stack>
      </Box>
    </>
  );
};

export default Home;
