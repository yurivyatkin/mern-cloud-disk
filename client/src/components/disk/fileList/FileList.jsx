import React from 'react';
import './fileList.css';
import { useSelector } from 'react-redux';
import File from './file/File';

const FileList = () => {
  // state.files by default is set to [] and with getFiles is set to data.files from the response
  const fileList = useSelector((state) => state.files.files);
  const fileElements = fileList.map((file) => (
    <File key={file.id} file={file} />
  ));

  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Name</div>
        <div className="filelist__date">Date</div>
        <div className="filelist__size">Size</div>
      </div>
      {fileElements}
    </div>
  );
};

export default FileList;
