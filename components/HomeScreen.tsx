import React from "react";
import {View} from 'react-native';
import { IPost } from "../services/apiService";
import Post from "./Post";

interface IHomeScreenProps{
    posts:IPost[]
}

const HomeScreen = ({posts}:IHomeScreenProps) =>{
    return(
        <>
            <View style={{alignItems:'center'}}>
            {posts.map((post: IPost, index) => (
              <Post
                key={index}
                userImageSource={post.owner.picture}
                userName={`${post.owner.firstName} ${post.owner.lastName}`}
                bodyImageSource={post.image}
                tags={post.tags}
                caption={post.text}
                liked={false}
                likes={post.likes}
              />
            ))}
          </View>
        </>
    )
}

export default HomeScreen;