import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; // Not sure about this import, assuming it's a custom hook
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import styles from './nearbyjobs.style';
import Data from '../../../people.json'; // Assuming this is your JSON data containing job details

const Nearbyjobs = () => {
  const router = useRouter(); // Assuming useRouter is a custom hook from Expo Router
  const [data, setData] = useState([]); // Initialize state for job data
  const [isLoading, setLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState(false); // State to handle errors
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        setData(Data);
        setTimeout(() => {
          setLoading(false); 
        }, 1500);
      } catch (error) {
        setError(true); 
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity onPress={() => router.push('/nearbyJob')}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
         
          data.data.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
