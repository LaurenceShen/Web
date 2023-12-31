import React, { useState , useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from "react-router-dom";
import './login.css';
import './index.css';
import SideBar from './sidebar.js';
import {handlelogin} from './auth.js';
/* mdb-react-ui-kit */
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

import { MDBBadge } from 'mdb-react-ui-kit';

import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {ChatProvider,useChat} from './useChat.js'

function Login(){
    const { books, status, post, createUser,profile,setProfile ,sendToken}=useChat();

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
			localStorage.setItem('token',codeResponse.access_token)
			console.log('coderesponse: ',codeResponse);
			console.log(sendToken());
		},
        onError: (error) => console.log('Login Failed:', error)
    });
	useEffect(
		()=>{sendToken()},[]
	)

    useEffect(
        () =>{
            if (profile.name){
                localStorage.setItem("useremail", profile.email);
                createUser([profile.name, profile.email])
            }
			console.log('jkjk',profile);
        },
        [profile]
    )
    
    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile({});
        localStorage.clear();
    };

    return (
        <div className="Login">
            <div className = "User-block">
                <SideBar />
            </div>
                {profile.name ? (
                <div className="Login-Block">
                    <h2 className = "Title">Logged in!</h2>
                    <br />
                    <br />
                    <div className = "Google-Login">
                        <p>{`Welcome,${profile.name}!`}</p>
                        <p>Welcome,{profile.email}!<br /></p>
                        <a> Go to write your first post! &nbsp;</a>
                        <a href = '/'><MDBIcon fas icon="pen-alt" /></a>
                    <br />
                    <br />
                        <button onClick={()=>logOut()}>Log out</button>
                    </div>
                </div>
                    ) : (
                <div className="Login-Block">
                    <h2 className = "Title">Login</h2>
                    <br />
                    <br />
                    <div className = "Google-Login">
                        <MDBBtn outline rounded color='warning' onClick={() => login()}>Sign in with Google 🚀 </MDBBtn>
                    </div>
            </div>
                )}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}
export default Login;
