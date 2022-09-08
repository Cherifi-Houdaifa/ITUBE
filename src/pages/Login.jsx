import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { logIn } from '../firebase';

export default function Login() {
    const navigate = useNavigate();
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
