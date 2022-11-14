import {View,StyleSheet} from 'react-native';
import LikeButton from './LikeButton';

interface IFooterProps{
    likes:number,
    liked:boolean
}

const Footer = ({likes,liked}:IFooterProps) =>{
    return(
        <View style={styles.container}>
            <LikeButton liked={liked} likes={likes}/>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection:'row',
    }

});

export default Footer;