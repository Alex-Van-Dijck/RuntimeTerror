import { StyleSheet, View, Text, Image } from "react-native";

interface IBodyProps {
  imageSource: string;
  tags: string[];
  caption: string;
}

const Body = ({ imageSource, tags, caption }: IBodyProps) => {
  return (
    <View style={styles.container}>
      <Text>{caption}</Text>
      <Image style={styles.image} source={{ uri: imageSource }} />
      <Text style={styles.tags}>
        {tags.map((tag: string, key) => (
          <Text>#{tag} </Text>
        ))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  tags: {
    textAlign: "left",
  },
  caption: {
    textAlign: "left",
  },
});

export default Body;
