import React,{useState} from 'react';
import {View,TextInput,StyleSheet,TouchableOpacity,Button,Text} from 'react-native';
import Header from './Header';
import Constants from "expo-constants";
import { Camera, CameraType } from 'expo-camera';


const NewPostScreen =()=> {

    const userImageSource = "https://pm1.narvii.com/7258/5520799cf0539b408bd8abee0a14d3a492ee5107r1-753-753v2_hq.jpg";
    const userName = "Pikachu";
     
    const [caption,setCaption] = useState<string>("");
    const [tags,setTags] = useState<string[]>([""]);
    const [bodyImageSource,setBodyImageSource] = useState<string>("");
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    let camera: Camera | null;

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    console.log('taking picture');
    if (!camera) return
    const photo = await camera.takePictureAsync(); 
    console.log(photo);
    }

    

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
                {!permission?.granted? <View style={styles.container}>
                        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                        <Button onPress={requestPermission} title="grant permission" />
                    </View> :  <View style={styles.cameraContainer}>
                    <Camera style={styles.camera} type={type} ref={(r)=>{camera = r}}>
                        <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>Flip Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={takePicture}>
                                <Text style={styles.text}>Take Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>    }
                <View>
                <Button title='Submit post' style={styles.submitButton}/>
                </View>
                
            </View>
            

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        paddingTop: Constants.statusBarHeight,
        display:'flex',
        flexDirection:"column",
        marginLeft:'auto',
        marginRight:'auto',
   },
   inputContainer:{
      marginTop:80, 
   }, 
   textinput: {
       marginTop:10,
        borderColor: "lightblue", borderWidth: 1
   },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop:160,
  },
  camera: {
    marginTop:100,
    width:300,
    height:400
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 'auto',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderColor:'white',
    borderRadius:100,
    borderWidth:1,

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  submitButton:{
  }
});

export default NewPostScreen;