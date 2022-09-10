import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../assets/loading.gif';
import { uploadVideo, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/Upload.css';

export default function Upload() {
    const [titleInput, setTitleInput] = useState('');
    const [currentFile, setCurrentFile] = useState();
    const [currentThumbnail, setCurrentThumbnail] = useState();
    const [loading, setLoading] = useState(false);
    const videoInputRef = useRef();
    const thumbnailInputRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            }
        })
        document.title = `ITube | Upload Video`;
    }, [])

    const videoClickHandler = (event) => {
        videoInputRef.current.click();
        videoInputRef.current.addEventListener('change', (e) => {
            if (e.target.value === '' || e.target.value === null) {
                console.log('this does not count');
                return;
            }
            if (!/(\.mp4)$/i.test(e.target.value)) {
                alert('Allowed File Extensions Are: mp4');
                e.target.value = null;
                return;
            }
            if (!e.target.files[0]) {
                alert('You Should Upload A File');
                e.target.value = null;
                return;
            }
            if (e.target.files[0].size / 1024 / 1024 > 100) {
                alert('File Too Big\nMaximum File Size Allowed is 100MB');
                e.target.value = null;
                return;
            }
            setCurrentFile(e.target.files[0]);
        });
    };

    const thumbnailClickHandler = (event) => {
        thumbnailInputRef.current.click();
        thumbnailInputRef.current.addEventListener('change', (e) => {
            if (e.target.value === '' || e.target.value === null) {
                console.log('this does not count');
                return;
            }
            if (!/(\.png|\.jpeg|\.jpg)$/i.test(e.target.value)) {
                alert('Allowed File Extensions Are: png, jpeg, jpg');
                e.target.value = null;
                return;
            }
            if (!e.target.files[0]) {
                alert('You Should Upload A File');
                e.target.value = null;
                return;
            }
            if (e.target.files[0].size / 1024 / 1024 > 3) {
                alert('File Too Big\nMaximum File Size Allowed is 3MB');
                e.target.value = null;
                return;
            }
            setCurrentThumbnail(e.target.files[0]);
        });
    };

    const uploadClickHandler = async (e) => {
        if (!titleInput || titleInput === '') {
            alert('You must specify a title');
            return;
        }
        if (!currentThumbnail || currentThumbnail === '') {
            alert('You must Choose A Thumbnail');
            return;
        }
        if (!currentFile || currentFile === '') {
            alert('You must Choose A Video');
            return;
        }
        setLoading(true);
        await uploadVideo(titleInput, currentFile, currentThumbnail);
        navigate('/');
    };

    return (
        <div className="upload-content">
            {loading ? (
                <div style={{ alignItems: 'center' }}>
                    <div className="image">
                        <img src={loadingGif} alt="Loading Gif" />
                    </div>
                    <p>Don't Close The Tab</p>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Video Title"
                        autoComplete="off"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                    />

                    <input
                        type="file"
                        hidden
                        ref={thumbnailInputRef}
                        accept="image/png, image/jpeg, image/png"
                    />

                    <input
                        type="button"
                        value="Choose Thumbnail"
                        onClick={thumbnailClickHandler}
                    />

                    <input
                        type="file"
                        hidden
                        ref={videoInputRef}
                        accept="video/mp4"
                    />

                    <input
                        type="button"
                        value="Choose Video"
                        onClick={videoClickHandler}
                    />
                    <input
                        type="button"
                        value="Upload"
                        style={{ backgroundColor: '#5552b3' }}
                        onClick={uploadClickHandler}
                    />
                </div>
            )}
        </div>
    );
}
