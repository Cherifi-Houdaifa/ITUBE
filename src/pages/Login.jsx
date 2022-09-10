import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { logIn } from '../firebase';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `ITube | Login`;
    }, []);
    return (
        <div className="login-content">
            <div
                onClick={async () => {
                    await logIn();
                    navigate('/');
                }}
            >
                Login With Google
            </div>
        </div>
    );
}
