import React, {useState,useEffect} from "react";
import { db } from "../../config/firebase";
import {getDocs,collection} from "firebase/firestore";
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Post} from "./post"

export interface Post{
    id: string;
    userId: string;
    title: string;
    username: string,
    description: string;
}


export const Home= ()=>{
    const [user] = useAuthState(auth);
    console.log(user?.uid);
    const [posts,setPosts]= useState<Post[]>([]);
    const postsRef= collection(db,"posts");

    const getPosts= async ()=>{
        const data= await getDocs(postsRef);
        setPosts(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]);
    };
    useEffect(()=>{getPosts();},[]);
    return(
        <div className="grid-container">
            {posts?.map((cur)=>
                <Post post={cur} curUser={cur.userId===user?.uid}/>
            )}
        </div>
    );
};