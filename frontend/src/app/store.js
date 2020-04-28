import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../features/accounts/accountsSlice';
import transfersReducer from '../features/transfers/transfersSlice';

export default configureStore({
  reducer: {
    accounts: accountsReducer,
    transfers: transfersReducer
  }
});
