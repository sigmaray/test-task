import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccounts, selectLoading } from './accountsSlice';

export function Accounts() {
  const accounts = useSelector(selectAccounts);
  const loading = useSelector(selectLoading);

  return (
    <div>
      {loading ? (
        <div>..Loading accounts..</div>
      ) : (
        <div>
          {accounts.length ? (
            <React.Fragment>
              Account List:
              {accounts.map((item) => (
                <p key={item.id}>{JSON.stringify(item)}</p>
              ))}
            </React.Fragment>
          ) : (
            'No accounts found'
          )}
        </div>
      )}
    </div>
  );
}
