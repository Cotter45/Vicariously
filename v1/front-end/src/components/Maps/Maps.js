// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFeatures } from '../../store/posts';


const containerStyle = {
  width: '98%',
  height: '800px',
};

const standard = {
  lat: 39.9526,
  lng: 75.1652,
};

const Maps = ({ apiKey, location }) => {
  const dispatch = useDispatch();

  const [markers, setMarkers] = useState();
  const [center, setCenter] = useState(standard);
  const posts = useSelector(state => state.posts.featuredPosts);


  useEffect(() => {
    if (posts) return;

    return dispatch(getFeatures());
  }, [posts, dispatch])

  useEffect(() => {
    if (!posts) return;

    setMarkers(posts.map(post => {
      return {
        lat: +post.lat, lng: +post.lng
      }
    }))
  }, [posts, setMarkers])

  useEffect(() => {
    if (!location.length) return;

    setCenter(location[0])
  }, [location])


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });


  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
        >
          {markers && markers.map((location, index) => (
            <Marker
              key={index}
              position={location}
            ></Marker>
          ))}
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
