import { Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import LikeButton from "./LikeButton";

interface IPostProps {
  userImageSource: string;
  userName: string;
  bodyImageSource: string;
  tags: string[];
  caption: string;
  likes: number;
  liked: boolean;
}

const Post = ({
  userImageSource,
  userName,
  bodyImageSource,
  tags,
  caption,
  liked,
  likes,
}: IPostProps) => {
  return (
    <>
      <View style={styles.card}>
        <Header imageSource={userImageSource} name={userName} />
        <Body imageSource={bodyImageSource} tags={tags} caption={caption} />
        <LikeButton liked={liked} likes={likes} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    borderColor: "lightgrey",
    borderRadius: 50,
    borderWidth: 2,
    width: 300,
    height: 480,
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginTop: 40,
  },
});

export default Post;
