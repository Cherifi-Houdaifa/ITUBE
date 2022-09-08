import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVideos } from '../firebase';
import '../styles/Home.css';

export default function Home() {
    const [videos, setVideos] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fn = async () => {
            const result = await getVideos();
            setVideos(result);
        };
        fn();
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
