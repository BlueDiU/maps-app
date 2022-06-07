import { Map } from 'mapbox-gl';
import { useReducer } from 'react';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

export interface IMapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: IMapState = {
  isMapReady: false,
  map: undefined,
};

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    mapReducer,
    INITIAL_STATE
  );

  return (
    <MapContext.Provider value={{ ...state }}>
      {children}
    </MapContext.Provider>
  );
};
