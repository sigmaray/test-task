import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import noty from '../../lib/noty';

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: {
    loading: true,
    items: []
  },
  reducers: {
    fetchAccountsSuccess: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { fetchAccountsSuccess, setLoading } = accountsSlice.actions;

export const fetchAccounts = () => (dispatch) => {
  dispatch(setLoading(true));
  return axios
    .get('/api/accounts')
    .then(({ data }) => {
      dispatch(fetchAccountsSuccess(data.accounts));
      dispatch(setLoading(false));
    })
    .catch(function () {
      noty(
        "Couldn't fetch data. Please reload page (press F5) and try one more time",
        'error'
      );
    });
};

export const selectAccounts = (state) => state.accounts.items;
export const selectLoading = (state) => state.accounts.loading;

export default accountsSlice.reducer;
