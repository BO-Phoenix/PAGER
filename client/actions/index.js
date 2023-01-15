import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getData = ({ route, params = {} }, options) => {
  axios.get(`${route}`, params)
    .then(res => {
      console.log('success in actions retrival ', res.data);
      return res.data;
    })
    .catch(err => {
      console.log('error in actions retrieval ', err);
      return err;
    })
};

const getAllEvents = createAsyncThunk('pager-data/getAllEvents', getData);
const getUserGroups = createAsyncThunk('pager-data/getUserGroups', getData);

export {
  getAllEvents,
  getUserGroups,
};