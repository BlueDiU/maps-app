import { useReducer } from 'react';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { Map } from 'mapbox-gl';

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

  const setMap = (map: Map) => {
    dispatch({ type: 'setMap', payload: map });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        // Methods
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
