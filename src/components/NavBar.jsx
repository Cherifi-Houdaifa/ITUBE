import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getUser } from '../firebase';
import '../styles/NavBar.css';

export default function NavBar() {
    const popup = useRef();
    const nav = useRef();
    const location = useLocation();

    // hide navbar when in login page
    useEffect(() => {
        /login/i.test(location.pathname)
            ? nav.current.classList.add('hide')
            : nav.current.classList.remove('hide');
    }, [location.pathname]);

    return (
        <nav ref={nav}>
            <h1>ITube</h1>
            <div className="data">
                <div className="profile-pic">
                    <img
                        referrerPolicy="no-referrer"
                        src={getUser() ? getUser().photoURL : ''}
                        alt="Profile Picture"
                        onClick={() => popup.current.classList.toggle('hide')}
                    />
                </div>
                <div className="popup hide" ref={popup}>
                    <div>Channel</div>
                    <div>Logout</div>
                </div>
            </div>
        </nav>
    );
}
