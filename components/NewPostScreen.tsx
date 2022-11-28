import React,{useState} from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import Header from './Header';
import Constants from "expo-constants";


const NewPostScreen =()=> {

    const userImageSource = "https://pm1.narvii.com/7258/5520799cf0539b408bd8abee0a14d3a492ee5107r1-753-753v2_hq.jpg";
    const userName = "Pikachu";
     
    const [caption,setCaption] = useState<string>("");
    const [tags,setTags] = useState<string[]>([""]);
    const [bodyImageSource,setBodyImageSource] = useState<string>("");


    return(
        <>
            <View style={styles.container}>
                <Header imageSource={userImageSource} name={userName} />
                <View style={styles.inputContainer}>
                    <TextInput
                    secureTextEntry={false}
                    autoCapitalize="characters"
                    placeholder="Caption"
                    keyboardType="default"
                    style={styles.textinput}
                    onSubmitEditing={(e)=>{setCaption(e.nativeEvent.text)}}
                    />
                    <TextInput  secureTextEntry={false}
                    autoCapitalize="characters"
                    placeholder="Tags (Separated by ',')"
                    keyboardType="default"
                    style={styles.textinput}
                    />
                </View>
                
            </View>
        </>
    )

}

const styles = StyleSheet.create({ 
    container: {
         paddingTop: Constants.statusBarHeight,
         display:'flex',
         flexDirection:"column",
         marginLeft:15,
         marginRight:15,
    },
    inputContainer:{
       marginTop:100, 
    }, 
    textinput: {
        marginTop:10,
         borderColor: "lightblue", borderWidth: 1
    },

})

export default NewPostScreen;