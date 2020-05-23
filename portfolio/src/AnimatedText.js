import React from 'react';
import './styles/AnimatedText.css';

// Modified from Claire Laresen's Awesome Codepen:
// https://codepen.io/ClaireLarsen/pen/XmVyVX

export default function AnimatedText() {
  return (
    <div>
      <svg viewBox='0 0 960 300'>
        <symbol id='s-text'>
          <text textAnchor='middle' x='50%' y='80%'>
            Alex
          </text>
        </symbol>

        <g className='g-ants'>
          <use href='#s-text' className='text-copy'></use>
          <use href='#s-text' className='text-copy'></use>
          <use href='#s-text' className='text-copy'></use>
          <use href='#s-text' className='text-copy'></use>
          <use href='#s-text' className='text-copy'></use>
        </g>
      </svg>
    </div>
  );
}
