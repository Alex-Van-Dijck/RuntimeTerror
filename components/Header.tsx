import { StyleSheet, View ,Image,Text} from "react-native";

interface IHeaderProps{
    imageSource:string,
    name:string
}

const Header = (props:IHeaderProps) =>{

    return(
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <Image source={require(props.imageSource)}/>
                </View>
                <View>
                    <Text>{props.name}</Text>
                </View>
            </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
    },
    avatar:{
        width:80,
        height:80,
        backgroundColor:'red',
        borderRadius:200,
        margin:10,
    },
    name:{

    }
});

export default Header;