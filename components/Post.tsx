import {Text,View,StyleSheet} from 'react-native';
import Header from './Header';


const Post = () =>{

return(
<>
    <View style={styles.card} >
        <Header imageSource='https://randomuser.me/api/portraits/med/men/3.jpg' name='John Doe'/>
    </View>
        
</>
)

}

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection: 'row',
        borderColor: 'blue',
        borderRadius: 50,
        borderWidth: 2,
        width:300,
        height:600,
        justifyContent:'flex-start',
        backgroundColor:'lightgrey',
    }
  });
  

export default Post;