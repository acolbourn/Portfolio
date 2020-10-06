import React from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingSpinner from './LoadingSpinner';
import '../styles/SpinnerFade.css';

export default function SpinnerFade({ isLoading }) {
  // transition group needs key change to trigger
  const triggerFadeKey = isLoading ? 'loading' : 'loaded';
  console.log(triggerFadeKey);
  const content = isLoading ? <LoadingSpinner /> : <></>;
  return (
    <TransitionGroup className='loadingSpinner'>
      <CSSTransition key={triggerFadeKey} timeout={1000} classNames='fade'>
        {/* <LoadingSpinner /> */}
        {content}
      </CSSTransition>
    </TransitionGroup>
  );
}
