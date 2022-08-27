import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import API from '../network/apis/APIs';
import { requestPayload } from '../utils/Constants';
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import users from "../assets/users.json"

//On real projects this async operation should use, for this case project work reducers.
export const createSession = createAsyncThunk('createSession', async (arg) => {
  try {
    const response = await API.createSession({...arg, ...requestPayload});
    return response.data;
  } catch (err) {
    return err.response.data
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: {
    isPending: false,
    user: null,
    inviteUser: false,
  },
  reducers: {
    setUser: (state, action) => {
      let isValidUser = false
      users.forEach(user => {
        if (user.email == action.payload.email && user.password == action.payload.password) {
          Cookies.set('activeUser', JSON.stringify(user));
          isValidUser = true
          state.inviteUser = true;
          toast.dismiss();
          toast.success('Login Successful');
          state.user = user;
          return;
        }
      })
      if (!isValidUser) {
        toast.dismiss();
        toast.error('Check Your Email or Password');
        state.inviteUser = false;
      }
    },
    removeUser: (state, action) => {
      state.user = null;
      state.inviteUser = false;
      Cookies.remove('activeUser')
    }
  },
  extraReducers: {

    [createSession.pending]: (state, {payload}) => {
    },
    [createSession.fulfilled]: (state, {payload}) => {
    },
    [createSession.rejected]: (state, {payload}) => {
    },

  },
});

export default slice.reducer;

export const {
  setUser,
  removeUser
} = slice.actions;
