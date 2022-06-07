import { createContext } from 'react';

interface IPlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
}

export const PlacesContext = createContext<IPlacesContextProps>(
  {} as IPlacesContextProps
);
