'use strict';

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-95.1805856, 39.6745988],
  zoom: 3,
});
