import { createContext } from 'react';
import { Map } from 'mapbox-gl';

interface IMapContextProps {
  isMapReady: boolean;
  map?: Map;
  // Methods
  setMap: (map: Map) => void;
}

export const MapContext = createContext<IMapContextProps>(
  {} as IMapContextProps
);
