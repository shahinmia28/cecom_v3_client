import React from 'react';

const Video = () => {
  return (
    <div className='container_my'>
      <div className='w-full h-screen p-20 '>
        <iframe
          className='w-full h-full border-2 border-orange-500'
          src='https://www.youtube.com/embed/K9INdOgUGrA?si=1uCMsQthdjKxcO9q'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerpolicy='strict-origin-when-cross-origin'
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
