import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../firebase';

export default function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        getUser() || navigate("/login");
    })
    return <div>Home</div>;
}
