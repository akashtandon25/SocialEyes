import React from "react";
import { Link } from 'react-router-dom';
import { auth, provider } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from 'firebase/auth';

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  const navigate= useNavigate();

  const signInWithGoogle= async ()=>{
      const result= await signInWithPopup(auth,provider); 
      console.log(result);
      navigate('/'); //used to switch to the home page after function call.
  };

  return (
    <div className="Navbar">
      {user && (
        <div className='NavbarText'>  
            <div className="NavbarLoggedIn">
                <Link to={'/'} className='NavbarText'>Home</Link>
                <Link to={'createpost'} className='NavbarText'>Create Post</Link>
            </div>
            <div className="NavbarUserInfo">
                <img src={user?.photoURL || ""} className='NavbarImage' alt="User Avatar" />
                <div>
                <button onClick={signUserOut} className="NavbarUserSignOut">Sign Out</button>
                    <p className="NavbarUserDisplay">{user?.displayName}</p>
                </div>
            </div>
        </div>)}
      {!user && (
        <div className='NavbarText'>
            <Link to={'/'} style= {{color:"white"}}>Home</Link>
            <button onClick={signInWithGoogle}>Sign In</button>
        </div>
      )}
    </div>
  );
};
