import Link from '@material-ui/core/Link';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import PdfButtons from './PdfButtons';
import useStyles from './styles/PdfViewerStyles';

// Configure the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

export default function PdfViewer({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  return (
    <div className={classes.root}>
      <div className={classes.pdfContainer} ref={ref}>
        <Document
          file={pdf.local}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
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
      <Link
        className={classes.downloadLink}
        href={pdf.dropbox}
        target='_blank'
        rel='noopener noreferrer'
      >
        Download PDF
      </Link>
    </div>
  );
}
