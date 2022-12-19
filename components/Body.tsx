import { StyleSheet, View, Text, Image } from "react-native";

interface IBodyProps {
  imageSource: string;
  tags: string[];
  caption: string;
  theme:number,
}

const Body = ({ imageSource, tags, caption,theme }: IBodyProps) => {
  return (
    <View style={styles.container}>
      <Text style={theme==0?styles.caption:styles.captionDark}>{caption}</Text>
      <Image style={styles.image} source={{ uri: imageSource }} />
      <Text style={theme==0?styles.tags:styles.tagsDark}>
        {tags.map((tag: string, key) => (
          <Text key={key}>#{tag} </Text>
        ))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    paddingBottom: 10,
  },
  image: {
    height: 250,
    width: 250,
    justifyContent: "center",
    marginTop: 20,
  },
  tags: {
    textAlign: "left",
    paddingBottom: 10,
    paddingTop: 10,
  },
  caption: {
    textAlign: "left",
  },
  tagsDark:{
    textAlign: "left",
    paddingBottom: 10,
    paddingTop: 10,
    color:'white'
  },
  captionDark:{
    color:'white',
    textAlign: "left"
  }
});

export default Body;
