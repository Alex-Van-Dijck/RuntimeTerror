import React,{useState,useEffect} from "react";
import {View,StyleSheet,Button,Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

interface settingProps{
  setTheme: (value:number)=> void
  Theme:number
}

const SettingsScreen = ({setTheme,Theme}:settingProps) =>{

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem("Theme");
      if (value !== null) {
        setTheme(parseInt(value));
      }
      console.log('GET in settings ' + value);
    };
    getData();
  }, []);


  const toggleTheme = () =>{
    if(Theme==0){
      setTheme(1);
    }else{
      setTheme(0);
    }
    
  }

  useEffect(() => {
    const storeData = async () => {
      await AsyncStorage.setItem("Theme", Theme.toString());
      console.log("POST  " + Theme);
    };
    storeData();
    
  }, [toggleTheme]);

    return(
        <View >
            <Button onPress={toggleTheme} title="Switch theme" />
            <Text>Current theme: {Theme}</Text>
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