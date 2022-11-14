import {View,Text,StyleSheet, Pressable,Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useState } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ILikeProps{
    likes:number,
    liked:boolean
}

const LikeButton = ({likes,liked}:ILikeProps) =>{

    const [likesNow,setLikesNow] = useState<number>(likes);
    const [likedNow,setLikedNow] = useState<Boolean>(liked);

    const handleLike = () => {
        setLikedNow((likedNow) => !likedNow);

        likedNow? setLikesNow(likesNow-1) : setLikesNow(likesNow+1);
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={()=>{handleLike()}} style={styles.pressable}>
                {likedNow? <AntDesign name="like1" size={24} color="black" /> : <AntDesign name="like2" size={24} color="black" /> }
                <Text>{likesNow} </Text>
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
    }

})

export default LikeButton;