import { useContext, useEffect, useReducer } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';

import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';

export interface IMapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: IMapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    mapReducer,
    INITIAL_STATE
  );

  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((market) => market.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>`);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: 'setMarkers', payload: newMarkers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

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
