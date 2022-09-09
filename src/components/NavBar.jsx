import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, logOut } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/NavBar.css';

export default function NavBar() {
    const [profilePic, setProfilePic] = useState('');
    const popup = useRef();
    const nav = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    // hide navbar when in login page
    useEffect(() => {
        /login/i.test(location.pathname)
            ? nav.current.classList.add('hide')
            : nav.current.classList.remove('hide');
    }, [location.pathname]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setProfilePic(user.photoURL);
            }
        });
    }, []);

    return (
        <nav ref={nav}>
            <h1>ITube</h1>
            <div className="data">
                <div className="profile-pic">
                    <img
                        referrerPolicy="no-referrer"
                        src={profilePic}
                        alt="Profile Picture"
                        onClick={() => popup.current.classList.toggle('hide')}
                    />
                </div>
                <div
                    className="popup hide"
                    ref={popup}
                    onClick={() => popup.current.classList.toggle('hide')}
                >
                    <div onClick={() => navigate('/')}>Home</div>
                    <div onClick={() => navigate('/videos')}>Videos</div>
                    <div onClick={() => navigate('/upload')}>Upload Video</div>
                    <div
                        onClick={() => {
                            logOut();
                            navigate('/login');
                        }}
                    >
                        Logout
                    </div>
                </div>
            </div>
        </nav>
    );
}
