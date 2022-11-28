import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import HomeScreen from "./components/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewPostScreen from "./components/NewPostScreen";

const App = () => {

  const Tab = createBottomTabNavigator();


  return (
    <NavigationContainer >
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="New Post" component={NewPostScreen} />
        </Tab.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  
});

export default App;
