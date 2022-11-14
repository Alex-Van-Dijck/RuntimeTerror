import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Post from "./components/Post";
import { getData, IPost } from "./services/apiService";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [onlyCreated, setOnlyCreated] = useState<boolean>(false);
  useEffect(() => {
    getData("posts", onlyCreated)
      .then((data) => setPosts(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);
  const numberInArray: number = 7;
  return (
    <View style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <Text>Is loading...</Text>
        ) : (
          <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scroll: {
    paddingTop: 80,
  },
});

export default App;
