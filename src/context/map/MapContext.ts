import { createContext } from 'react';
import { Map } from 'mapbox-gl';

interface IMapContextProps {
  isMapReady: boolean;
  map?: Map;
  // Methods
  setMap: (map: Map) => void;
  getRouteBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export const MapContext = createContext<IMapContextProps>(
  {} as IMapContextProps
);
