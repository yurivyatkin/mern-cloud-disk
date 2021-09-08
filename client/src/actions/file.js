import axios from 'axios';
import { setFiles } from '../reducers/fileReducer';

export function getFiles(dirId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      // console.log('getFiles response.data', response.data);
      dispatch(setFiles(response.data.files));
    } catch (e) {
      // alert(e.response.data.message);
      console.log('actions/file/getFiles', e);
    }
  };
}
