import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const BtnMyLocation = () => {
  /* Context func */
  const { userLocation } = useContext(PlacesContext);
  const { map, isMapReady } = useContext(MapContext);

  const onClick = () => {
    if (!isMapReady) throw new Error('Mapa no esta listo');
    if (!userLocation)
      throw new Error('No ninguna ubicación de usuario');

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <button
      className="btn btn-dark"
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999,
      }}
    >
      Mi ubicación
    </button>
  );
};
