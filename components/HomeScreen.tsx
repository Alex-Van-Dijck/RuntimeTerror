import React,{useEffect,useState,useContext} from "react";
import {View,ScrollView,Text,StyleSheet} from 'react-native';
import Post from "./Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAPIData, getUser, IPost, IUser } from "../services/apiService";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";

interface HomeScreenProps{
  Theme:number
}

const HomeScreen = ({Theme}:HomeScreenProps) =>{
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [onlyCreated, setOnlyCreated] = useState<boolean>(false);

  
  
  /* A hook that is used to fetch data from the api. */ 

  useEffect(() => {
    getAPIData("posts", onlyCreated)
      .then((data) => setPosts(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

    return(
        <>
        <ScrollView style={styles.scroll}>
          {isLoading ? (
            <Text>Is loading...</Text>
          ) : posts.length === 0 ? (<Text>You made no posts yet</Text>) : (
            <View style={{alignItems:'center'}}>
            {posts.map((post: IPost, index) => (
              <Post
                theme={Theme}
                key={index}
                userImageSource={post.owner.picture}
                userName={`${post.owner.firstName} ${post.owner.lastName}`}
                bodyImageSource={post.image}
                tags={post.tags}
                caption={post.text}
                liked={false}
                likes={post.likes}
              />
            ))}
          </View>
          )}
        </ScrollView>
           
        </>
    )
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },container:{
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
})

export default HomeScreen;