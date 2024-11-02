import React from 'react';

const Video = () => {
  return (
    <div className='container_my'>
      <div className='w-full h-screen p-20 '>
        <iframe
          className='w-full h-full border-2 border-orange-500'
          src='https://www.youtube.com/embed/K9INdOgUGrA?si=1uCMsQthdjKxcO9q'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
