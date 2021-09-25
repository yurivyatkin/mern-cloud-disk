import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FileList from './fileList/FileList';
import PopUp from '../popup/PopUp';
import Uploader from './fileList/uploader/Uploader';

import { getFiles, uploadFile } from '../../actions/file';
import {
  setCurrentDir,
  setFileView,
  setPopupDisplay,
} from '../../reducers/fileReducer';

import './disk.css';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const loader = useSelector((state) => state.app.loader);
  const dirStack = useSelector((state) => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={() => backClickHandler()}>
          Back
        </button>
        <button className="disk__create" onClick={() => showPopupHandler()}>
          Create folder
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Upload file
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="disk__select"
        >
          <option value="name">По имени</option>
          <option value="type">По типу</option>
          <option value="date">По дате</option>
        </select>
        <button
          className="disk__plate"
          onClick={() => dispatch(setFileView('plate'))}
        />
        <button
          className="disk__list"
          onClick={() => dispatch(setFileView('list'))}
        />
      </div>
      <FileList />
      <PopUp />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Drag files here
    </div>
  );
};

export default Disk;
