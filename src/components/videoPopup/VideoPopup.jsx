import React from "react";
import ReactPlayer from "react-player/youtube";
import { AiOutlineClose } from 'react-icons/ai';
import "./videoPopup.scss";


const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    <AiOutlineClose/>
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    
                    width="100%"
                    height="100%"
                
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;