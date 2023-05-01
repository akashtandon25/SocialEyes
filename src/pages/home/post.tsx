import React from "react";
import {Post as iPost} from "./home"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from "../../config/firebase";
import {deleteDoc,doc} from 'firebase/firestore';

interface Props{
    post: iPost;
    curUser: boolean;
}

export const Post=(props:Props)=>{
    const {post,curUser}= props;
    console.log(post.id);
    const docref= doc(db,"posts",post.id);
    const deletePost=()=>{
            deleteDoc(docref)
            .then(() => {
                console.log("Entire Document has been deleted successfully.")
            })
            .catch(error => {
                console.log(error);
            })
    }
    return(
            <div className="card">
                <h2 className="card-title">{post.title}</h2>
                <div className="card-description-background">
                    <p className="card-description">{post.description}</p>
                </div>
                <div className="card-profile">
                    <p className="card-profile-username">@{post.username}</p>
                    {curUser&&
                    <IconButton aria-label="delete" onClick={deletePost}>
                        <DeleteIcon />
                    </IconButton>
                    }
                </div>
            </div>
);}