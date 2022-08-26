import React, { useEffect, useRef } from 'react';
import './Map.scss';


const Map = ({stops, center}) => {
  const google = window.google;
  const googleMap = useRef()


  useEffect(() => {
    initMap(stops, center)
  }, [center])


  function initMap(stops, center) {

    const map = new google.maps.Map(googleMap.current, {
      zoom: 15,
      center: center,
    });

    stops.forEach(stop => {
      const infowindow = new google.maps.InfoWindow({
        content: `<h5 id='stop_name'>${stop.stop_name}</h5>
                  <p id="stop_description">${stop.stop_desc}</p>
                  <p id="stop_code">Stop Code: ${stop.stop_code}</p>
                  <p id="stop_coordinates">Stop Coordinates: ${stop.stop_lon},${stop.stop_lat}</p>`,
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
    <div className={'main-map d-flex justify-content-center align-items-center flex-column pb-4'}>
      <div className="jumbotron w-100 bg-light shadow mb-2">
        <div className="container">
          <h1 className="display-4">STOPS MAP</h1>
          <p>All stops that defined on redux are here, on the Google Maps, with Google Map Info Windows.</p>
        </div>
      </div>
      <div id="map" ref={googleMap} className={'google-map shadow'}></div>
    </div>
  );
};

export default Map;
