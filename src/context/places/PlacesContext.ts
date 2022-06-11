import { createContext } from 'react';
import { IFeature } from '../../interfaces/places';

interface IPlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];

  // Methods
  searchPlacesByQuery: (query: string) => Promise<IFeature[]>;
}

export const PlacesContext = createContext<IPlacesContextProps>(
  {} as IPlacesContextProps
);
