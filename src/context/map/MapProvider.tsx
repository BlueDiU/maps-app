import { useContext, useEffect, useReducer } from 'react';

/* MapBox */
import {
  AnySourceData,
  LngLatBounds,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';

/* Context */
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';

/* Apis */
import { directionApi } from '../../apis';

/* Interfaces */
import { IDirectionResponse } from '../../interfaces/directions';

export interface IMapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
  info: { kms: number; minutes: number };
}

const INITIAL_STATE: IMapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  info: { kms: 0, minutes: 0 },
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

    const { kms, minutes } = state.info;

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
        <hr />
        <h6>Información adicional</h6>
        <div>
          <div>
            <span class="text-secondary">Distacia en KM/H: </span> ${kms} KM
          </div>
          <div>
            <span class="text-secondary">Tiempo estimado:</span>
            ${minutes} minutos
          </div>
        </div>
      `);

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

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionApi.get<IDirectionResponse>(
      `/${start.join(',')};${end.join(',')}`
    );
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 1000);
    kms /= 1000;

    const minutes = Math.floor(duration / 60);

    console.log({ kms, minutes });
    dispatch({ type: 'setInfo', payload: { kms, minutes } });

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];

      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, { padding: 200 });

    // Popyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#85C1E9',
        'line-width': 3,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        // Methods
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
