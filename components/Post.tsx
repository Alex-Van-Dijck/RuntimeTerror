import { Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import Body from "./Body";

interface IPostProps {
  userImageSource: string;
  userName: string;
  bodyImageSource: string;
  tags: string[];
  caption: string;
}

const Post = ({
  userImageSource,
  userName,
  bodyImageSource,
  tags,
  caption,
}: IPostProps) => {
  return (
    <>
      <View style={styles.card}>
        <Header imageSource={userImageSource} name={userName} />
        <Body imageSource={bodyImageSource} tags={tags} caption={caption} />
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
