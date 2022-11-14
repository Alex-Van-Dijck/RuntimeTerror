import { Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

interface IPostProps{
    userImageSource:string,
    userName:string,
    bodyImageSource:string,
    tags:string[],
    caption:string,
}

const Post = (props:IPostProps) =>{

return(
<>
    <View style={styles.card} >
        <Header imageSource={props.userImageSource} name={props.userName}/>
        <Body imageSource={props.bodyImageSource} tags={props.tags} caption={props.caption}/>
        <Footer liked={false} likes={69} />
    </View>
</>
)

}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    borderColor: "blue",
    borderRadius: 50,
    borderWidth: 2,
    width: 300,
    height: 480,
    backgroundColor: "lightgrey",
    padding:15,
    marginTop:40,
  },
});

export default Post;
