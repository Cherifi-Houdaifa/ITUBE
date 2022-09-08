import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../assets/loading.gif';
import { uploadVideo } from "../firebase";
import '../styles/Upload.css';

export default function Upload() {
    const [titleInput, setTitleInput] = useState('');
    const [currentFile, setCurrentFile] = useState();
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();

    const navigate = useNavigate();

    const fileClickHandler = (event) => {
        fileInputRef.current.click();
        fileInputRef.current.addEventListener('change', (e) => {
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
                alert('File Too Big\nMaximum File Size Allowed is 3MB');
                e.target.value = null;
                return;
            }
            setCurrentFile(e.target.files[0]);
        });
    };

    const uploadClickHandler = async (e) => {
        if (!titleInput || titleInput === "") {
            alert("You must specify a title");
            return;
        }
        if (!currentFile || currentFile === "") {
            alert("You must Choose A file");
            return;
        }
        setLoading(true)
        await uploadVideo(titleInput, currentFile);
        navigate("/");
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
                        ref={fileInputRef}
                        accept="video/mp4"
                    />

                    <input
                        type="button"
                        value="Choose Video"
                        onClick={fileClickHandler}
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
