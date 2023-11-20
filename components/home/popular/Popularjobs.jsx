import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; // Not sure about this import, assuming it's a custom hook
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import styles from './popularjobs.style';
import Data from '../../../people.json'; // Assuming this is your JSON data containing job details

const Popularjobs = () => {
  const router = useRouter(); // Assuming useRouter is a custom hook from Expo Router
  const [data, setData] = useState([]); // Initialize state for job data
  const [isLoading, setLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState(false); // State to handle errors
  const [selectedJob, setSelectedJob] = useState();
  useEffect(() => {
    // Simulating asynchronous data fetching
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

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity onPress={() => router.push('/popularJobs')}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data.data}
            renderItem={({ item }) => (
              <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress}/>
            )}
            keyExtractor={(item) => item?.job_id.toString()} // Changed keyExtractor to ensure a string key
            contentContainerStyle={{ paddingHorizontal: SIZES.medium }} // Updated columnGap to paddingHorizontal
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
