import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import API from '../network/apis/APIs';
import { requestPayload } from '../utils/Constants';
import stops from "../assets/stops.json"

//On real projects this async operation should use, for this case project work reducers.
export const getLocations = createAsyncThunk('getLocations', async (arg) => {
  try {
    const response = await API.getLocations({...arg, ...requestPayload});
    return response.data;
  } catch (err) {
    return err.response.data
  }

});

const slice = createSlice({
  name: 'map',
  initialState: {
    isLocationPending: null,
    stops: [],
    center: {lng: 29.94300329, lat: 40.76508891}
  },
  reducers: {
    getStops: (state, action) => {
      state.stops = stops
    },
  },
  extraReducers: {

    [getLocations.pending]: (state, {payload}) => {
      state.isLocationPending = true
    },
    [getLocations.fulfilled]: (state, {payload}) => {
      state.isLocationPending = false
    },
    [getLocations.rejected]: (state, {payload}) => {
      state.isLocationPending = false
    },

  },
});

export default slice.reducer;

export const {
  getStops
} = slice.actions;
