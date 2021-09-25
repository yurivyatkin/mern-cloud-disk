import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux';

import File from './file/File';

import './fileList.css';

const FileList = () => {
  // state.files by default is set to [] and with getFiles is set to data.files from the response
  const fileList = useSelector((state) => state.files.files);
  const fileView = useSelector((state) => state.files.view);

  if (fileList.length === 0) {
    return <div className="loader">Files not found</div>;
  }

  if (fileView === 'plate') {
    return (
      <div className="fileplate">
        {fileList.map((file) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }

  if (fileView === 'list') {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Name</div>
          <div className="filelist__date">Date</div>
          <div className="filelist__size">Size</div>
        </div>
        <TransitionGroup>
          {fileList.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={'file'}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
};

export default FileList;
