import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapViewer from './MapViewer';

const hardcodedAmbulances = [
  {
    _id: "1",
    crewMembers: "Driver 1, EMT 1, Medic 1",
    location: "38 Lyon Heights Rd, Toronto, CA",
    status: "Available",
    eta: 20,
  },
  {
    _id: "2",
    crewMembers: "Driver 2, EMT 2, Medic 2",
    location: "25 Alice Crescent, Toronto, CA",
    status: "On-Route",
    eta: 45,
  },
  {
    _id: "3",
    crewMembers: "Driver 3, EMT 3, Medic 3",
    location: "332 Conlins Road, Toronto, CA",
    status: "Available",
    eta: 1,
  },
  {
    _id: "3",
    crewMembers: "Driver 3, EMT 3, Medic 3",
    location: "8500 Sheppard Ave E, Toronto, CA",
    status: "Available",
    eta: 1,
  },
  {
    _id: "3",
    crewMembers: "Driver 3, EMT 3, Medic 3",
    location: "4331 Lawrence Ave E, Toronto, CA",
    status: "Available",
    eta: 1,
  },
  // Add more ambulances as needed
];

const AmbulanceList = () => {
  const apiKey = 'AIzaSyCHW3uS5RuUar_K6FZLWMZTPGDETQ_U39c'; // Replace with your actual Google Geocoding API Key
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const ambulancesWithCoordinates = [];

      for (const ambulance of hardcodedAmbulances) {
        const formattedAddress = encodeURIComponent(ambulance.location);
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;

        try {
          const response = await axios.get(geocodeUrl);

          if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            ambulancesWithCoordinates.push({
              ...ambulance,
              latitude: lat,
              longitude: lng,
            });
          } else {
            console.error('Geocoding failed for address:', ambulance.location);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

      setAmbulances(ambulancesWithCoordinates);
    };

    if (apiKey) {
      fetchCoordinates();
    } else {
      console.error('API Key is missing. Please provide a valid API Key.');
    }
  }, [apiKey]);

  return (
    <div>
      {/* Your existing code here */}
      <MapViewer ambulanceData={ambulances} />
    </div>
  );
};

export default AmbulanceList;
