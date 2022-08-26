import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import API from '../network/apis/APIs';
import { requestPayload } from '../utils/Constants';
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const users = [
  {
    id: 1,
    name: "orhan",
    surname: "aydoğdu",
    password: "12341214",
    email: "orhan@aydogdu.com.tr",
    status: true
  },
  {
    id: 2,
    name: "enes",
    surname: "kahraman",
    password: "98776241",
    email: "enes@kahraman.com.tr",
    status: false
  },
  {
    id: 3,
    name: "enes",
    surname: "poyraz",
    password: "12416754",
    email: "enes@poyraz.com.tr",
    status: true
  },
  {
    id: 4,
    name: "tahir",
    surname: "köse",
    password: "123456",
    email: "tahir@kose.com.tr",
    status: true
  }
]

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
          toast.success('Login Successful');
          state.user = user;
          return;
        }
      })
      if (!isValidUser) {
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
