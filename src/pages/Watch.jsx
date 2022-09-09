import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideo } from '../firebase';
import '../styles/Watch.css';

export default function Watch() {
    const { id } = useParams();
    const [available, setAvailable] = useState(true);
    const [video, setVideo] = useState({});

    useEffect(() => {
        const fn = async () => {
            const result = await getVideo(id);
            if (result.exists()) {
                setVideo(result.data());
                document.title = `ITube | ${result.data().title}`;
            } else {
                setAvailable(false);
            }
        };
        fn();
    }, []);

    return (
        <div className="watch-content">
            {available ? (
                <>
                    <div className="video">
                        <video src={video.url} controls></video>
                    </div>
                    <div className="data">
                        <div className="pic">
                            <img
                                src={video.userPicture}
                                referrerPolicy="no-referrer"
                                alt="Channel Picture"
                            />
                        </div>

                        <p>{video.userName}</p>
                    </div>
                </>
            ) : <div className='unavailable'>Video Unavailable</div>}
        </div>
    );
}
