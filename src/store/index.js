import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import map from './map';
import auth from "./auth";

const reducer = combineReducers({
  map,
  auth
});

const store = configureStore({
  reducer,
});

export default store;
