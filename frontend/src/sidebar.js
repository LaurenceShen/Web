import React, { useState , useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from "react-router-dom";
import './index.css';
import './login.js';
import useRWD from './useRWD.js';
import {useChat} from './useChat.js';
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
import styled from "styled-components";
import {Link} from 'react-router-dom';
const Bigdiv=styled.div`
	background-color:#000000;
	z-index:100;
`
function SideBar(){
  const device = useRWD();
  const {sendToken, profile}=useChat();

  useEffect(
    () => {
			sendToken();
			
    },
    []
  )

  return (
    <Bigdiv className='User-icon'>
        <nav className = {device==="mobile" ? ("menu_mobile") : ("menu")}>
            <div className='icon-img'>
				<i class='fa-solid fa-circle-user fa-bounce fa-2xl' />
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to={`/user/${profile.email}`}>User</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/matching">Matching</Link></li>
            </ul>
        </nav>
    </Bigdiv>
  );
}

export default SideBar;
