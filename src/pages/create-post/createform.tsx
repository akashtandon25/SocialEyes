import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

export const CreateForm= ()=>{

    interface formSchema{
        title: string;
        description: string;
    }

    const Schema= yup.object().shape({
        title: yup.string().required("You must Enter a Title"),
        description: yup.string().required("You must add a Description").max(200,"Maximum 200 Characters Allowed"),
    });

    const { register, handleSubmit, formState: {errors} }= useForm<formSchema>({
        resolver: yupResolver(Schema),
    });

    const postsref= collection(db,"posts"); //Used to tell that we want to reference the "posts" collection inside the database "db" while adding a new entry.

    const [userData]= useAuthState(auth); //useAuthState hook is used to fetch user info from the auth variable which is defined inside firebase file.

    const navigate= useNavigate();

    const onCreatePost= (data:formSchema)=>{ 
        addDoc(postsref,{ //addDoc takes an argument postsref that tells kaha pe post karna hai, and the data that needs to be posted as the second argument
            ...data, //isse jo data ke andar ki fields hai vo automatically iske andar add ho jayengi
            username: userData?.displayName,
            userId: userData?.uid,
        });
        navigate('/');
    };

    return (
        <div className="PostForm">
            <form className="PostFormCard" onSubmit={handleSubmit(onCreatePost)}> {/*The handleSubmit function passes the data received after submission to the onCreatePost function*/}
                <input className="PostFormInput" placeholder="Title" {...register('title')}/>
                <p style={{color:"red"}}>{errors.title?.message}</p>
                <textarea className="PostFormInput" style={{height:"6em"}} placeholder="Description" {...register('description')}/>
                <p style={{color:"red"}}>{errors.description?.message}</p>
                <input className="PostFormSubmit" type={'submit'} placeholder="Submit"/>
            </form>
        </div>
    );
};
