import { createContext } from 'react';
import { Map } from 'mapbox-gl';

interface IMapContextProps {
  isMapReady: boolean;
  map?: Map;
}

export const MapContext = createContext<IMapContextProps>(
  {} as IMapContextProps
);
