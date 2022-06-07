import { Map } from 'mapbox-gl';
import { IMapState } from './MapProvider';

type MapAction = {
  type: 'setMap';
  payload: Map;
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

    default:
      return state;
  }
};
