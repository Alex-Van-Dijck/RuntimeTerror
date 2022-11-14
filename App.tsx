import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import Post from './components/Post';


export default function App() {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Post userImageSource='https://randomuser.me/api/portraits/med/men/3.jpg' userName='John Doe' bodyImageSource='https://img.dummyapi.io/photo-1564849444446-f876dcef378e.jpg' tags={[ 'plant', 'mammal', 'pet' ]} caption='A feral cat short-fur gray and orange cat on green...'/>
        <Post userImageSource='https://randomuser.me/api/portraits/med/men/3.jpg' userName='John Doe' bodyImageSource='https://img.dummyapi.io/photo-1564849444446-f876dcef378e.jpg' tags={[ 'plant', 'mammal', 'pet' ]} caption='A feral cat short-fur gray and orange cat on green...'/>
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  scroll: {
    paddingTop:80
  },
});
