import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Post from "./components/Post";
import { getData, IPost } from "./services/apiService";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    getData("posts")
      .then((data) => setPosts(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);
  const numberInArray: number = 7;
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Is loading...</Text>
      ) : (
        <ScrollView>
          {posts.map((post: IPost, index) => (
            <Post
              key={index}
              userImageSource={post.owner.picture}
              userName={`${post.owner.firstName} ${post.owner.lastName}`}
              bodyImageSource={post.image}
              tags={post.tags}
              caption={post.text}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
