import { useContext, useRef, useLayoutEffect } from 'react';
import { PlacesContext } from '../context';
import { Loading } from './Loading';

//@ts-ignore
import { Map } from 'mapbox-gl';

export function MapView() {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapDiv}
      style={{
        height: '100vh',
        left: '0',
        position: 'fixed',
        top: '0',
        width: '100vw',
      }}
    >
      {userLocation?.join(',')}
    </div>
  );
}
