import React, { useEffect, useRef } from 'react';
import './Map.scss';

const Map = ({stops}) => {

  const googleMap = useRef()

  useEffect(() => {
    initMap()
  }, [])

  const google = window.google;

  function initMap() {

    const map = new google.maps.Map(googleMap.current, {
      zoom: 4,
      center: {lng:29.94146137, lat: 40.76001855},
    });

    stops.forEach(stop => {
      const infowindow = new google.maps.InfoWindow({
        content: stop.stop_desc,
      });
      const marker = new google.maps.Marker({
        position: {lng: stop.stop_lon, lat: stop.stop_lat},
        map,
        title: stop.name,
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    })
  }

  window.initMap = initMap

  return (
    <div id="map" ref={googleMap} className={'google-map'}></div>
  );
};

export default Map;
