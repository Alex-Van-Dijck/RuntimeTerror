import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import HomeScreen from "./components/HomeScreen";
import { NavigationContainer ,useIsFocused,useFocusEffect} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewPostScreen from "./components/NewPostScreen";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingsScreen from "./components/SettingsScreen";


const App = () => {

  const isFocused = useIsFocused;
  const [Theme, setTheme] = useState(0);
  
  const  toggleState=(value:number)=>{
    console.log("State: " + value);
    setTheme(value);
  }

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem("Theme");
      if (value !== null) {
        setTheme(parseInt(value));
      }
      console.log("GET in app" + value);
    };
    getData();
    
  },[setTheme] );

  const Tab = createBottomTabNavigator();

  const darkTheme = {
    dark:true,
    colors:{
      primary: '#007acc',
      background: '#1e1e1e',
      card: '#252526',
      text: '#949499',
      border: '#3e3e42',
      notification: '#3e3e42',
    }
    }

    const lightTheme = {
      dark: false,
      colors: {
        primary: '#007acc',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
      },
    };

  return (
    <NavigationContainer theme={Theme==0?lightTheme:darkTheme}>
        <Tab.Navigator >
          <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({color, size}: {color:any, size:any}) => <FontAwesome name="home" size={size} color={color} />
        }}  />
          <Tab.Screen name="New Post" component={NewPostScreen} options={{
            tabBarIcon: ({color, size}: {color:any, size:any}) => <Entypo name="camera" size={size} color={color} />
        }}   />
        <Tab.Screen name="Settings" children={()=><SettingsScreen Theme={Theme} setTheme={toggleState}/>} options={{
            tabBarIcon: ({color, size}: {color:any, size:any}) => <FontAwesome name="gear" size={size} color={color} />
        }}   />
        </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  dark:{
    backgroundColor:"black",
    color:"white"
  }
});

export default App;
