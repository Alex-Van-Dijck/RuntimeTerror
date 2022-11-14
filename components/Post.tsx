import { Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import Body from "./Body";

const Post = () => {
  return (
    <>
      <View style={styles.card}>
        <Header
          imageSource="https://randomuser.me/api/portraits/med/men/3.jpg"
          name="John Doe"
        />
        <Body
          imageSource="https://img.dummyapi.io/photo-1564849444446-f876dcef378e.jpg"
          tags={["plant", "mammal", "pet"]}
          caption="A feral cat short-fur gray and orange cat on green..."
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    borderColor: "blue",
    borderRadius: 50,
    borderWidth: 2,
    width: 300,
    height: 600,
    justifyContent: "center",
    backgroundColor: "lightgrey",
  },
});

export default Post;
