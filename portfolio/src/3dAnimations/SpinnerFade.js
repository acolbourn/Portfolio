import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingSpinner from './LoadingSpinner';
import '../styles/SpinnerFade.css';

export default function SpinnerFade({ isLoading }) {
  // This component shows a loading spinner until the 3d models are fully loaded.  It then fades and unmounts to save cpu.  This required some unusual react workarounds because using props had to be avoided to avoid a canvas rerender.  The three.js loaded callbacks were also inadequate as 3d objects could technically be loaded but not displayed for several milliseconds.  To overcome this, a loading ref is updated inside the startup animation state machine once everything is loaded completely and viewable.  The useEffect/setInterval below checks that ref every 300ms until its loaded, after which the spinner is unmounted and fades out using the react-transition-group library.
  const [isLoadingState, setIsLoadingState] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoading.current === true) {
        setIsLoadingState(true);
      } else {
        setIsLoadingState(false);
      }
    }, 300);
    // Stop timer once loading complete
    if (isLoadingState === false) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isLoading, isLoadingState, setIsLoadingState]);

  // transition group needs key change to trigger
  const triggerFadeKey = isLoadingState ? 'loading' : 'loaded';
  const content = isLoadingState ? <LoadingSpinner /> : <></>;
  return (
    <TransitionGroup className='loadingSpinner'>
      <CSSTransition key={triggerFadeKey} timeout={1000} classNames='fade'>
        {content}
      </CSSTransition>
    </TransitionGroup>
  );
}
