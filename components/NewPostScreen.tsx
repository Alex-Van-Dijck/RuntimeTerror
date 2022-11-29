import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
} from "react-native";
import Header from "./Header";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import { getData, getUser, IUser } from "../services/apiService";
import { Title } from "../services/titleEnum";

const NewPostScreen = () => {
  const [user, setUser] = useState<IUser>({title: "", firstName: "", lastName: "", picture: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [caption, setCaption] = useState<string>("");
  const [tags, setTags] = useState<string[]>([""]);
  const [bodyImageSource, setBodyImageSource] = useState<string>("");
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [useCamera, setUseCamera] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      const searchUser = await getUser("60d0fe4f5311236168a109da");
      await setUser(searchUser);
      console.log(searchUser)
      await setIsLoading(false);
    };
    loadUser();
  }, []);

  useEffect(() => {
  }, [useCamera]);

  let camera: Camera | null;
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  /**
   * If the current camera type is back, then set the camera type to front, otherwise set the camera
   * type to back.
   */
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  /**
   * TakePicture is an async function that takes a picture with the camera, sets the useCamera state to
   * false, and sets the bodyImageSource state to the photo's uri.
   */
  const takePicture = async () => {
    console.log("taking picture");
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    await setUseCamera(false)
    setBodyImageSource(photo.uri);
    console.log(photo);
  };

 /**
  * If the current value of useCamera is true, then set useCamera to false, otherwise set useCamera to
  * true.
  */
  const handleUseCamera = () => {
    setUseCamera(current => !current);
  }

 return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Is loading...</Text>
        ) : (
          <Header
            imageSource={`${user.picture}`}
            name={`${user.firstName} ${user.lastName}`}
          />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={false}
            autoCapitalize="characters"
            placeholder="Caption"
            keyboardType="default"
            style={styles.textinput}
            onSubmitEditing={(e) => {
              setCaption(e.nativeEvent.text);
            }}
          />
          <TextInput
            secureTextEntry={false}
            autoCapitalize="characters"
            placeholder="Tags (Separated by ',')"
            keyboardType="default"
            style={styles.textinput}
          />
          <Button title="Take a picture" onPress={handleUseCamera}/>
        </View>
        {useCamera ? <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(r) => {
              camera = r;
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>Take Picture</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View> : <View></View>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "column",
    marginLeft: 15,
    marginRight: 15,
  },
  inputContainer: {
    marginTop: 100,
  },
  textinput: {
    marginTop: 10,
    borderColor: "lightblue",
    borderWidth: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
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
    fontWeight: "bold",
    color: "white",
  },
  submitButton:{
  }
});

export default NewPostScreen;
