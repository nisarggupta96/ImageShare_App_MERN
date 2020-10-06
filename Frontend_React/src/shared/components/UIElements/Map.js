import React, { useEffect, useRef } from 'react';
// import ReactMapGL, { Marker } from 'react-map-gl';

import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = (props) => {
  /*
  // To use ReactMapGL ->
  const TOKEN = 'insert MapboxGL TOKEN here';

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
  */
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
