import axios from 'axios';
import { setUser } from '../reducers/userReducer';

export const registration = async (email, password) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/registration`,
      {
        email,
        password,
      }
    );
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
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        {
          email,
          password,
        }
      );
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
      const response = await axios.get(`http://localhost:5000/api/auth/auth`, {
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
