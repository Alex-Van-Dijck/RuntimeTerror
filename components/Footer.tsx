import {View,StyleSheet} from 'react-native';
import LikeButton from './LikeButton';

interface IFooterProps{
    likes:number,
    liked:boolean,
    theme:number,
}

const Footer = ({likes,liked,theme}:IFooterProps) =>{
    return(
        <View style={styles.container}>
            <LikeButton liked={liked} likes={likes} theme={theme}/>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:3,
        flexDirection:'row',
    }

});

export default Footer;