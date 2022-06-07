import { useReducer } from 'react';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { Map, Marker, Popup } from 'mapbox-gl';

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
    const myLocationPopup = new Popup().setHTML(
      `
      <h4>Aquí estoy</h4>
      <p>En algun lugar del mundo</p>
      `
    );

    new Marker({ color: '#E74C3C' })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

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
