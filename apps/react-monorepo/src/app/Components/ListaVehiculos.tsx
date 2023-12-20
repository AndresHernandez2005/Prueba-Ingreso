import React from 'react';
import { Card, Divider, Stack, Tab, Tabs } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import CardVehiculo from './CardVehiculo';

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

const ListaVehiculos = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ))
    ) {
      setValue(newValue);
    }
  };
  return (
    <Card>
      <Stack padding={2}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Carros" href="" icon={<DirectionsCarIcon />}></Tab>
          <Tab label="Motos" href="" icon={<TwoWheelerIcon />} />
        </Tabs>
        <Divider />
        <CardVehiculo />
      </Stack>
    </Card>
  );
};

export default ListaVehiculos;
