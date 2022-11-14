import {View,Text,StyleSheet, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useState } from 'react';

interface ILikeProps{
    likes:number,
    liked:boolean
}

const LikeButton = ({likes,liked}:ILikeProps) =>{

    const [likesNow,setLikesNow] = useState<number>(likes);
    const [likedNow,setLikedNow] = useState<Boolean>(liked);

    const handleLike = () => {
        setLikesNow(likesNow+1);
         setLikedNow(true);
    }

    return(
        <View>
            <Pressable onPress={()=>{handleLike()}}>
                {liked? <AntDesign name="like1" size={24} color="black" /> : <AntDesign name="like2" size={24} color="black" /> }
                <Text>{likes} </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    
    container:{
        flexDirection:'row',
        width:80,
        height:20,
    }

})

export default LikeButton;