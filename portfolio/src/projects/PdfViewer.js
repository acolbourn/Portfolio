import Link from '@material-ui/core/Link';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import PdfButtons from './PdfButtons';
import useStyles from './styles/PdfViewerStyles';

export default function PdfViewer({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, [ref]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  return (
    <div className={classes.root}>
      <div className={classes.pdfContainer} ref={ref}>
        <Document file={pdf.local} onLoadSuccess={onDocumentLoadSuccess}>
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
      <Link className={classes.downloadLink} href={pdf.dropbox} target='_blank'>
        Download PDF
      </Link>
    </div>
  );
}
