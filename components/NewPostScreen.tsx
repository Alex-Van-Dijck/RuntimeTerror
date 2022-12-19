import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  Image,
  ScrollView,

} from "react-native";
import Header from "./Header";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import { getAPIData, getUser, IPost, IUser } from "../services/apiService";
import { Title } from "../services/titleEnum";
import { getImageUrl } from "../services/imageService";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface INewPostScreenProps{
  Theme:number
}

const NewPostScreen = ({Theme}:INewPostScreenProps) => {
  const [user, setUser] = useState<IUser>({
    title: "",
    firstName: "",
    lastName: "",
    picture: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [caption, setCaption] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [bodyImageSource, setBodyImageSource] = useState<string>("");
  const [arrImage, setArrImage] = useState<IObj[]>([]);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [newPost,setNewPost] = useState<IPost>();



  useEffect(() => {
    const loadUser = async () => {
      const searchUser = await getUser("60d0fe4f5311236168a109da");
      await setUser(searchUser);
      await setIsLoading(false);
    };
    loadUser();
  }, []);

  useEffect(() => {}, [useCamera]);

  let camera: Camera | null;
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center"}}>
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
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    await setUseCamera(false);
    await setBodyImageSource(photo.uri);
    addImageToArray(photo.uri);
  };

  /**
   * If the current value of useCamera is true, then set useCamera to false, otherwise set useCamera to
   * true.
   */
  const handleUseCamera = () => {
    setUseCamera((current) => !current);
  };

  /**
   * When the user clicks the button, open the image picker and allow the user to choose an image. If
   * the user chooses an image, set the image source to the image the user chose.
   */
  const handleChoosePicture = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result) => {
      if (!result.cancelled) {
        setBodyImageSource(result.uri);
        addImageToArray(result.uri);
      }
    });
  };

  /* Defining an interface for an object that has an id property and a uri property. */
  interface IObj {
    id: number;
    uri: string;
  }

  /**
   * AddImageToArray() is a function that takes an object with an id and uri property and adds it to an
   * array of objects with the same properties.
   */
  const addImageToArray = async (uri: string) => {
    let newId: number = 1
    if (arrImage.length !== 0){
    newId =  arrImage[arrImage.length -1].id + 1;
    }
    const obj: IObj = { id: newId, uri: uri };
    await setArrImage([...arrImage, obj]);
    return;
  };

  /**
   * Delete the image from the array and set the bodyImageSource to an empty string.
   */
  const deleteImageFromArray =  () => {
    try {
    setArrImage(arrImage.filter((item) => item.uri !== bodyImageSource));
    setBodyImageSource("");
    } catch (error) {
      console.log(error);
    }
  }

  const storeArray = async () => {
    let imgString = JSON.stringify(arrImage);
    await AsyncStorage.setItem ("Array",imgString);
  };
  
  // useEffect(()=>{
  //   storeArray();
  // },[]);

  const createPost=()=>{
      console.log('this function has not been implemented yet!');
  }

  return (
    <Fragment>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Is loading...</Text>
        ) : (
          <Header
            theme={0}
            imageSource={`${user.picture}`}
            name={`${user.firstName} ${user.lastName}`}
          />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={false}
            autoCapitalize="characters"
            placeholder="Caption"
            placeholderTextColor={Theme===0?'grey':'lightgrey'}
            keyboardType="default"
            style={Theme===0?styles.textinput:styles.textInputDark}
            onChange={(e) => {
              setCaption(e.nativeEvent.text);
            }
          }
          value={caption}
          />
          <TextInput
            secureTextEntry={false}
            autoCapitalize="characters"
            placeholder="Tags (Separated by ',')"
            keyboardType="default"
            placeholderTextColor={Theme===0?'grey':'lightgrey'}
            style={Theme===0?styles.textinput:styles.textInputDark}
            onChange={(e)=>{
              setTags(e.nativeEvent.text);
            }}
            value={tags}
          />
          <Button title="Take a picture" onPress={handleUseCamera} />
          <Button title="Choose a picture" onPress={handleChoosePicture} />
        </View>
        {useCamera ? (
          <View style={styles.cameraContainer}>
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
          </View>
        ) : (
          // TODO extract in components
          bodyImageSource && (
            <View>
              <Image
                style={{ height: 300, width: 300 }}
                source={{ uri: bodyImageSource }}
              />
              <Button
                  title="Delete"
                  onPress={deleteImageFromArray}
                />
            </View>
          )
        )}  
      <Button title="Submit" onPress={createPost}/>  
      </View>
    </Fragment>
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
  textInputDark:{
    marginTop: 10,
    borderColor: "lightblue",
    borderWidth: 1,
    color:'white'
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    marginTop: 100,
    width: 350,
    height: 400,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: "auto",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 100,
    borderWidth: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  submitButton: {},
});

export default NewPostScreen;
