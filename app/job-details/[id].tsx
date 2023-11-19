import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  Company,
  Specifics,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
} from "../../components";
import { useRouter, Stack } from "expo-router";
import Data from "../../people.json";
import { COLORS, SIZES, icons } from "../../constants";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<[] | any>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [link, setLink] = useState<any>();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const googleLink = data?.data?.[0]?.job_google_link;


  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(Data);
        setLink(googleLink);
        setTimeout(() => setLoading(false), 1500);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title='Qualifications'
            points={data.data[0].job_required_skills ?? ["Not Available"]}
          />
        );
      case "About":
        return <JobAbout info={data.data[0].job_description} />;
      case "Responsibilities":
        return (
          <Specifics
            title='Responsibilities'
            points={data.data[0].job_responsibilities ?? ["Not Available"]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => params.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data.data[0].employer_logo}
              jobTitle={data.data[0].job_title}
              companyName={data.data[0].employer_name}
              location={data.data[0].job_country}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {getContent()}
          </View>
        )}
      </ScrollView>
      <JobFooter
        url={link ?? "https://careers.google.com"}
      />
    </SafeAreaView>
  );
};

export default JobDetails;
