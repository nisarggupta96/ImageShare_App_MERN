import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = (props) => {

  const TOKEN = 'pk.eyJ1IjoidGltZWhlcm8iLCJhIjoiY2tmbzllc2cwMDF0bjJ5cGhyejdwY3h4ZSJ9.iA4b1u6a5ic7Z-4gbkj7aQ';

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 400,
    latitude: props.coordinates.lat,
    longitude: props.coordinates.long,
    center: [props.coordinates.lat, props.coordinates.long],
    zoom: 16,
  });

  const _onViewportChange = viewport => setViewPort({ ...viewport, transitionDuration: 100 });

  return (
    <div className={`map ${props.className}`} style={props.style}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
      >
        <Marker latitude={props.coordinates.lat} longitude={props.coordinates.long} offsetLeft={-10} offsetTop={-10}>
          <span>⦿</span>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
