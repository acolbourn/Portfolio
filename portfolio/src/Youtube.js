import React from 'react';
import ReactPlayer from 'react-player';

export default function Youtube() {
  const robotVideos = [
    'vD6ngnMxDQM',
    'Vt46-e4vAJM',
    'H3HIfaRytCg',
    'Fu9YxBRYT_E',
  ];
  //   const hackathonVideos = ['uWXcr1ekypU', 'WZ6fewjkqo4'];
  return (
    <div>
      <h1>youtube</h1>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${robotVideos[0]}`}
        playing
        controls={true}
        volume={0}
        muted
      />
    </div>
  );
}
