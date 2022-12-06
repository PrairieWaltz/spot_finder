'use strict';

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: spot.geometry.coordinates,
  zoom: 15,
  projection: 'globe',
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({ color: 'black', rotation: 45 })
  .setLngLat(spot.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h5>${spot.title}</h5><p>${spot.location}</p>`
    )
  )
  .addTo(map);
