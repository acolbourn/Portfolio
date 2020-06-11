import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PdfButtons from './PdfButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfContainer: {
    height: '100%',
    // width: '78%',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.25);',
    backgroundColor: 'white',
    color: 'black',
  },
  buttons: {
    padding: '1.5rem',
  },
}));

export default function PdfViewer({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  return (
    <div className={classes.root}>
      <div className={classes.pdfContainer} ref={ref}>
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            height={height}
          />
        </Document>
      </div>
      <nav className={classes.buttons}>
        <PdfButtons
          pageNumber={pageNumber}
          numPages={numPages}
          prev={goToPrevPage}
          next={goToNextPage}
        />
      </nav>
    </div>
  );
}
