import React from 'react';
import { useSelector } from 'react-redux';
import { selectTransfers, selectLoading } from './transfersSlice';

export function Transfers() {
  const transfers = useSelector(selectTransfers);
  const loading = useSelector(selectLoading);

  return (
    <div>
      {loading ? (
        <div>..Loading..</div>
      ) : (
        <div>
          {transfers.length ? (
            <React.Fragment>
              Transfer List:
              {transfers.map((item) => (
                <p key={item.id}>{JSON.stringify(item)}</p>
              ))}
            </React.Fragment>
          ) : (
            'No transfers found'
          )}
        </div>
      )}
    </div>
  );
}
