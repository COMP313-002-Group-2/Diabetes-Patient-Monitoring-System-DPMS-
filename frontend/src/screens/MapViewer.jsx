import React from 'react';
import { useLoadScript, Marker } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '50%', // You can adjust the width as needed, e.g., '50%' for half the screen width
  height: '75vh', // Adjust the height as needed, e.g., '75vh' for 75% of the viewport height
};
const center = {
  lat: 43.78596, // default latitude
  lng: -79.23285, // default longitude
};

const MapViewer = ({ ambulanceData }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCHW3uS5RuUar_K6FZLWMZTPGDETQ_U39c', // Replace with your actual API Key
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const ambulanceIcon = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "blue", // Change to the desired color for ambulance
    fillOpacity: 1,
    strokeWeight: 1,
    rotation: 0,
    scale: 0.6, // Adjust the scale as needed
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
      >
        {ambulanceData.map((ambulance, index) => (
          <Marker
            key={index}
            position={{ lat: ambulance.latitude, lng: ambulance.longitude }}
            icon={ambulanceIcon}
            label={ambulance._id} 
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapViewer;
