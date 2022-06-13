import { Map, Marker } from 'mapbox-gl';

import { IMapState } from './MapProvider';

type MapAction =
  | {
      type: 'setMap';
      payload: Map;
    }
  | { type: 'setMarkers'; payload: Marker[] }
  | {
      type: 'setInfo';
      payload: { kms: number; minutes: number };
    };

export const mapReducer = (
  state: IMapState,
  action: MapAction
): IMapState => {
  switch (action.type) {
    case 'setMap':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };

    case 'setMarkers':
      return {
        ...state,
        markers: action.payload,
      };

    case 'setInfo':
      return {
        ...state,
        info: action.payload,
      };

    default:
      return state;
  }
};
