import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import HomeScreen from "./components/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewPostScreen from "./components/NewPostScreen";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

const App = () => {

  const Tab = createBottomTabNavigator();


  return (
    <NavigationContainer >
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name="home" size={size} color={color} />
        }}  />
          <Tab.Screen name="New Post" component={NewPostScreen} options={{
            
            tabBarIcon: ({color, size}) => <Entypo name="camera" size={size} color={color} />
        }}   />
        </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
