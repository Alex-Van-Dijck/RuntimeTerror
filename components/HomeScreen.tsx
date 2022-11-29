import React,{useEffect,useState} from "react";
import {View,ScrollView,Text,StyleSheet} from 'react-native';
import Post from "./Post";
import { getData, getUser, IPost, IUser } from "../services/apiService";


const HomeScreen = () =>{
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [onlyCreated, setOnlyCreated] = useState<boolean>(false);
  /* A hook that is used to fetch data from the api. */
  useEffect(() => {
    getData("posts", onlyCreated)
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
  },
})

export default HomeScreen;