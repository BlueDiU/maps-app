import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { LoadingPlaces } from './LoadingPlaces';
import { IFeature } from '../interfaces/places';

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  const [activeId, setActiveId] = useState<string>('');

  const onPlaceClicked = (place: IFeature) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  if (places.length === 0) {
    return <></>;
  }

  return (
    <ul
      className="list-group mt-3 pointer"
      style={{
        maxHeight: '450px',
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}
    >
      {places.map((place) => (
        <li
          className={`${
            activeId === place.id && 'active'
          } list-group-item list-group-item-action`}
          key={place.id}
          onClick={() => onPlaceClicked(place)}
        >
          <h6>{place.text_es}</h6>
          <p
            style={{
              fontSize: '12px',
            }}
          >
            {place.place_name}
          </p>
          <button
            className={`btn btn-sm  ${
              activeId === place.id
                ? 'btn-outline-light'
                : 'btn-outline-dark'
            }`}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
