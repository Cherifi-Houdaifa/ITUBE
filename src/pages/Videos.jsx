import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import remove from '../assets/remove.svg';
import { auth, getUserVideos, deleteVideo } from '../firebase';
import '../styles/Videos.css';

export default function Videos() {
    const [videos, setVideos] = useState();
    const userId = useRef();
    const navigate = useNavigate()


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserVideos(user.uid).then((result) => {
                    setVideos(result);
                    userId.current = user.uid;
                });
            } else {
                navigate("/login");
            }
        });
        document.title = `ITube | Videos`;
    }, []);

    const removeBtnHandler = async (id, title, uid) => {
        await deleteVideo(id, title, uid);
    };

    return (
        <div className="videos-content">
            <header>
                <h1>Your Videos</h1>
            </header>
            {videos
                ? videos.docs.map((video, index) => {
                      return (
                          <VideoRow
                              key={index}
                              title={video.data().title}
                              thumbnail={video.data().thumbnail}
                              onClick={() => {
                                  removeBtnHandler(
                                      video.id,
                                      video.data().title,
                                      userId.current
                                  );
                              }}
                          />
                      );
                  })
                : null}
        </div>
    );
}

function VideoRow({ title, thumbnail, onClick }) {
    const videoDiv = useRef()
    return (
        <div ref={videoDiv}>
            <div className="thumbnail">
                <img src={thumbnail} alt="Thumbnail Picture" />
            </div>
            <div className="title">{title}</div>
            <div className="remove-btn">
                <img
                    src={remove}
                    alt="Remove Video Button"
                    onClick={() => {
                        onClick();
                        videoDiv.current.remove()
                    }}
                />
            </div>
        </div>
    );
}
