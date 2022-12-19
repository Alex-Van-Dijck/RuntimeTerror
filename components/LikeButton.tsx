import {View,Text,StyleSheet, Pressable,Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useContext, useState } from 'react';
import { themeContext } from '../App';

interface ILikeProps{
    likes:number,
    liked:boolean,
}

const LikeButton = ({likes,liked}:ILikeProps) =>{

    const [likesNow,setLikesNow] = useState<number>(likes);
    const [likedNow,setLikedNow] = useState<Boolean>(liked);

    const handleLike = () => {
        setLikedNow((likedNow) => !likedNow);

        likedNow? setLikesNow(likesNow-1) : setLikesNow(likesNow+1);
    }
    const {theme, lightTheme, darkTheme} = useContext(themeContext);
    return(
        <View style={styles.container}>
            <Pressable onPress={()=>{handleLike()}} style={styles.pressable}>
                {likedNow? <AntDesign name="like1" size={24} color={theme === lightTheme ? "black" : "white" } /> : <AntDesign name="like2" size={24} color={theme === lightTheme ? "black" : "white"} /> }
                <Text style={theme === lightTheme ? styles.light : styles.dark}>{likesNow} </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    
    pressable:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:185
    },
    container:{
        width:50,
    },
    light:{
        color:'black'
    },
    dark:{
        color:'white'
    }

})

export default LikeButton;