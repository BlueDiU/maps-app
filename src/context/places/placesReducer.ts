import { IPlacesState } from './PlacesProvider';

import { IFeature } from '../../interfaces/places';

type PlacesAction =
  | {
      type: 'setUserLocation';
      payload: [number, number];
    }
  | { type: 'setLoadingPlaces' }
  | { type: 'setPlaces'; payload: IFeature[] };

export const placesReducer = (
  state: IPlacesState,
  action: PlacesAction
): IPlacesState => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    case 'setLoadingPlaces':
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };

    case 'setPlaces':
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };

    default:
      return state;
  }
};
