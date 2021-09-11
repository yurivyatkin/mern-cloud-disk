import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FileList from './fileList/FileList';
import PopUp from '../popup/PopUp';

import { getFiles } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';

import './disk.css';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'));
  }

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back">Back</button>
        <button className="disk__create" onClick={() => showPopupHandler()}>
          Create folder
        </button>
      </div>
      <FileList />
      <PopUp />
    </div>
  );
};

export default Disk;
