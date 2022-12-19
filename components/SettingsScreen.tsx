import React,{useState,useEffect, useContext} from "react";
import {View,StyleSheet,Button,Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { themeContext } from "../App";

interface settingProps{
  setTheme: () => void
}

const SettingsScreen = ({setTheme}:settingProps) =>{
  const {theme, lightTheme, darkTheme} = useContext(themeContext);

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem("Theme");
      if (value !== null) {
        setTheme();
      }
    };
    getData();
  }, []);


  const toggleTheme = () =>{
    setTheme();    
  }

  useEffect(() => {
    const storeData = async () => {
      if (theme === lightTheme) {
        await AsyncStorage.setItem("Theme", "lightTheme");
      } else {
        await AsyncStorage.setItem("Theme", "darkTheme");
      }
    };
    storeData();
    
  }, [toggleTheme]);

    return(
        <View >
            <Button onPress={toggleTheme} title="Switch theme" />
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "column",
    marginLeft: 15,
    marginRight: 15,
  },
    containerDark:{
        paddingTop: Constants.statusBarHeight,
        display: "flex",
        flexDirection: "column",
        marginLeft: 15,
        marginRight: 15,
        backgroundColor:"black",
        color:"white",
    }
}
)


export default SettingsScreen; 