// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '98%',
  height: '800px',
};

const center = {
  lat: 39.952583,
  lng: -75.165222,
};

const Maps = ({ apiKey, posts }) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

//   const markers = posts.map(post => {
//     return new google.maps.Marker({
//         position: { lat: post.lat, lng: post.lng },
//         GoogleMap,
//         title: 'Posts',
//     })
// })

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        />
      )}
    </>
  );
};

export default React.memo(Maps);
