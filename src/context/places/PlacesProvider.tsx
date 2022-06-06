import { useEffect, useReducer } from 'react';
import { getUserLocation } from '../../helpers';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';

export interface IPlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITIAL_STATE: IPlacesState = {
  isLoading: true,
  userLocation: undefined,
};

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    placesReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: 'setUserLocation', payload: lngLat })
    );
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
};
