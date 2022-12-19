import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import HomeScreen from "./components/HomeScreen";
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewPostScreen from "./components/NewPostScreen";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingsScreen from "./components/SettingsScreen";
import { createContext } from "react";


export interface ITheme {
  dark: boolean;
  colors: Colors;
}

interface Colors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
}

interface IThemeContext {
  theme: ITheme;
  lightTheme: ITheme;
  darkTheme: ITheme;
}

const darktheme: ITheme = {
  dark: true,
  colors: {
    primary: "#007acc",
    background: "#1e1e1e",
    card: "#252526",
    text: "#949499",
    border: "#3e3e42",
    notification: "#3e3e42",
  },
};

const lightTheme: ITheme = {
  dark: false,
  colors: {
    primary: "#007acc",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

export const themeContext = createContext<IThemeContext>({theme: lightTheme, lightTheme: lightTheme, darkTheme: darktheme});

const App = () => {
  const isFocused = useIsFocused;
  const [theme, setTheme] = useState<ITheme>({
    dark: false,
    colors: {
      primary: "#007acc",
      background: "rgb(242, 242, 242)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    }});

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem("theme");
      if (value !== null) {
        switch (value) {
          case "lightTheme":
            setTheme(lightTheme);
            break;
          case "darktheme":
            setTheme(darktheme);
            break;
          default:
            setTheme(lightTheme);
            break;
        }
      }
    };
    getData();
  }, [setTheme]);

  
  const handleChangetheme = () => {
    if (theme === darktheme) {
      setTheme(lightTheme);
      AsyncStorage.setItem("theme", "lightTheme");
    } else {
      setTheme(darktheme);
      AsyncStorage.setItem("theme", "darktheme");
    }
  };

  const Tab = createBottomTabNavigator();
  

  return (
    <themeContext.Provider value={{theme: theme, lightTheme:lightTheme, darkTheme:darktheme}}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              children={() => <HomeScreen/>}
              options={{
                tabBarIcon: ({ color, size }: { color: any; size: any }) => (
                  <FontAwesome name="home" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="New Post"
              children={() => <NewPostScreen/>}
              options={{
                tabBarIcon: ({ color, size }: { color: any; size: any }) => (
                  <Entypo name="camera" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              children={() => (
                <SettingsScreen setTheme={handleChangetheme} />
              )}
              options={{
                tabBarIcon: ({ color, size }: { color: any; size: any }) => (
                  <FontAwesome name="gear" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
    </themeContext.Provider>
  );
};

const styles = StyleSheet.create({
  dark: {
    backgroundColor: "black",
    color: "white",
  },
});

export default App;
