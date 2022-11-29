import { StyleSheet, View, Image, Text } from "react-native";

interface IHeaderProps {
  imageSource: string;
  name: string;
}

/**
 * Header is a function that takes in an object with two properties, imageSource and name, and returns
 * a View component with two children, an Image component and a Text component.
 * @param {IHeaderProps}  - IHeaderProps
 * @returns A React component.
 */
const Header = ({ imageSource, name }: IHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: imageSource }} />
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  name: {
    marginTop: 30,
    marginLeft: 5,
    fontSize: 18,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 200,
    margin: 10,
  },
});

export default Header;
