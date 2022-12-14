import { Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import LikeButton from "./LikeButton";

export interface IPostProps {
  userImageSource: string;
  userName: string;
  bodyImageSource: string;
  tags: string[];
  caption: string;
  likes: number;
  liked: boolean;
  theme: number;
}

const Post = ({
  userImageSource,
  userName,
  bodyImageSource,
  tags,
  caption,
  liked,
  likes,
  theme
}: IPostProps) => {
  return (
    <>
      <View style={theme==0?styles.card:styles.cardDark}>
        <Header imageSource={userImageSource} name={userName} theme={theme} />
        <Body imageSource={bodyImageSource} tags={tags} caption={caption} theme={theme} />
        <LikeButton theme={theme} liked={liked} likes={likes} />
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
  cardDark: {
    display: "flex",
    flexDirection: "column",
    borderColor: "rgb(199, 199, 204)",
    borderRadius: 50,
    borderWidth: 2,
    width: 300,
    height: 480,
    backgroundColor: "#252526",
    padding: 15,
    marginTop: 40,
  },
});

export default Post;
