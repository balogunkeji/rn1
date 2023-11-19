import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import  AntDesign  from "@expo/vector-icons/AntDesign";
const GetStarted = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.whitte,
        height: "100%",
        flexDirection: "column",
      }}
    >
      <StatusBar style='dark' />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.whitte },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "55%",
        }}
      >
        <Image
          source={images.started}
          resizeMode='contain'
          style={{ width: "110%" }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 60,
          backgroundColor: COLORS.white,
          width: "100%",
          height: "50%",
          borderTopLeftRadius: 40,
          borderTopEndRadius: 40,
        }}
      >
        <Text style={{ fontFamily: "DMSans-Bold", fontSize: SIZES.xxLarge, width: '70%' }}>
          Find a perfect job match
        </Text>
        <Text
          style={{
            paddingBottom: 30,
            paddingTop: 10,
            fontFamily: "DMSans-Regular",
            fontSize: SIZES.mm,
          }}
        >
          Finding your dream job is now much easier and faster like never before
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 60,
            backgroundColor: "#ff7754",
            borderRadius: 16,
          }}
          onPress={() => router.push('/home')}
        >
          <Text
            style={{
              fontFamily: "DMSans-Regular",
              fontSize: SIZES.mm,
              color: "#fff",
            }}
          >
            Let's Get Started 
            <AntDesign name="arrowright" size={20}/>
          </Text>
         
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
