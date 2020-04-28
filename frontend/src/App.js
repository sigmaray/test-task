import React from 'react';
import { Accounts } from './features/accounts/Accounts';
import NewAccountForm from './features/accounts/NewAccountForm';
import NewTransferForm from './features/transfers/NewTransferForm';
import { Transfers } from './features/transfers/Transfers';

function App() {
  return (
    <center>
      <h2>Accounts</h2>
      <Accounts />
      <h3>Create account</h3>
      <NewAccountForm />
      <hr />
      <h2>Transfers</h2>
      <Transfers />
      <h3>Transfer money</h3>
      <NewTransferForm />
      <hr />
      <a href="/admin">Admin</a>
    </center>
  );
}

export default App;
