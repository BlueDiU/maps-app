import { createContext } from 'react';

interface IPlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];

  // Methods
  searchPlacesByQuery: (query: string) => Promise<any>;
}

export const PlacesContext = createContext<IPlacesContextProps>(
  {} as IPlacesContextProps
);
