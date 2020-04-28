import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import noty from '../../lib/noty';

export const transfersSlice = createSlice({
  name: 'transfers',
  initialState: {
    loading: true,
    items: []
  },
  reducers: {
    fetchTransfersSuccess: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { fetchTransfersSuccess, setLoading } = transfersSlice.actions;

export const fetchTransfers = () => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get('/api/transfers')
    .then(({ data }) => {
      dispatch(fetchTransfersSuccess(data.transfers));
      dispatch(setLoading(false));
    })
    .catch(function () {
      noty(
        "Couldn't fetch data. Please reload page (press F5) and try one more time",
        'error'
      );
    });
};

export const selectTransfers = (state) => state.transfers.items;
export const selectLoading = (state) => state.transfers.loading;

export default transfersSlice.reducer;
