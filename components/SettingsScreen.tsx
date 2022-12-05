import React,{useState} from "react";
import {View,StyleSheet,Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const storeData = async()=>{
    await AsyncStorage.setItem("Mode","0");
  };
  
  const getData =async () => {
    const value = await AsyncStorage.getItem("Mode");
    if(value !== null){
      alert(parseInt(value));
    }else{
      alert("No data found");
    }
  };
  

const SettingsScreen = () =>{

  const [theme,setTheme] = useState<Boolean>(true);

  const toggleTheme = () =>{
    if(theme){
      setTheme(false);
    }else{
      setTheme(true);
    }
  }

    return(
        <View style={theme?styles.container:styles.containerDark}>
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