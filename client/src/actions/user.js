import axios from 'axios';
import { setUser } from '../reducers/userReducer';
import { API_URL } from '../config';

export const registration = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}api/auth/registration`, {
      email,
      password,
    });
    alert(response.data.message);
  } catch (e) {
    // alert(e.response.data.message);
    console.log('actions/user/registration', e);
  }
};

// Forgot to remove async here and lost two hours fiddling around the error:
// "Error: Actions must be plain objects. Use custom middleware for async actions."
// Googling found https://github.com/reduxjs/redux-thunk/issues/146#issuecomment-316976419
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      // alert(e.response.data.message);
      console.log('actions/user/login', e);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      // alert(e.response.data.message);
      console.log('actions/user/auth', e);
      localStorage.removeItem('token');
    }
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
        `${API_URL}api/files/avatar`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}api/files/avatar`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
