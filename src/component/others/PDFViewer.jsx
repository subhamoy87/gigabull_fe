import React from 'react';

const PDFViewer = ({ file }) => {
  return (
    <div>
      <iframe src={file} width='100%' height='600px' title='PDF Viewer' />
    </div>
  );
};

export default PDFViewer;
