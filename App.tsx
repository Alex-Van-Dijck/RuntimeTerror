import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Post from "./components/Post";
import { getData, IPost } from "./services/apiService";
import HomeScreen from "./components/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator>
          <ScrollView style={styles.scroll}>
          {isLoading ? (
            <Text>Is loading...</Text>
          ) : posts.length === 0 ? (<Text>You made no posts yet</Text>) : (
            <HomeScreen posts={posts} />
          )}
        </ScrollView>
        </Tab.Navigator>
       
      </View>
    </NavigationContainer>
    
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
    width: "100%",
  },
});

export default App;
