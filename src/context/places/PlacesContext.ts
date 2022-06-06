import { createContext } from 'react';

export interface IPlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
}

export const PlacesContext = createContext<IPlacesContextProps>(
  {} as IPlacesContextProps
);
