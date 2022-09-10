import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVideos , auth} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/Home.css';

export default function Home() {
    const [videos, setVideos] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            }
        })

        const fn = async () => {
            const result = await getVideos();
            setVideos(result);
        };
        fn();
        document.title = `ITube`;
    }, []);

    return (
        <div className="home-content">
            {videos.docs
                ? videos.docs.map((video, index) => {
                      return (
                          <VideoCard
                              key={index}
                              title={video.data().title}
                              thumbnail={video.data().thumbnail}
                              onClick={() => {
                                  navigate(`/watch/${video.id}`);
                              }}
                          />
                      );
                  })
                : null}
        </div>
    );
}

function VideoCard({ title, thumbnail, onClick }) {
    return (
        <div className="video" onClick={onClick}>
            <div className="image">
                <img src={thumbnail} alt="Video Thumbnail" />
            </div>
            <p className="title">{title}</p>
        </div>
    );
}
