import React from 'react';
import AnimatedText from './AnimatedText';
import PdfViewer from './PdfViewer';

export default function Home() {
  return (
    <div style={{ height: '80%' }}>
      <PdfViewer pdf={'MS Project Report - Alex Colbourn.pdf'} />
      {/* <AnimatedText /> */}
      {/* <iframe src='\MS Project Report - Alex Colbourn.pdf' /> */}
    </div>
  );
}
