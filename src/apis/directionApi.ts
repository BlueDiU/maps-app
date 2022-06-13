import axios from 'axios';

const directionApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token:
      'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja3hramV2OWIwbjEwMzFwYzJlZWl6N2g5In0.iKXPpYvo7UPRiiZ-x_lCrw',
  },
});

/* 
/-73.99561860550496%2C40.7345506875119%3B-73.98946144731205%2C40.73444150963016?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=YOUR_MAPBOX_ACCESS_TOKEN
*/

export default directionApi;
