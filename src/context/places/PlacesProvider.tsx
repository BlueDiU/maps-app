import { useEffect, useReducer } from 'react';
import { searchApi } from '../../apis';
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

  const searchPlacesByQuery = async (query: string) => {
    if (query.length === 0) return [];

    if (!state.userLocation)
      throw new Error('No hay ubicación del usuario');

    const resp = await searchApi.get(`/${query}.json`, {
      params: { proximity: state.userLocation.join(',') },
    });

    console.log(resp.data);

    return resp.data;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state, // Methods
        searchPlacesByQuery,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
