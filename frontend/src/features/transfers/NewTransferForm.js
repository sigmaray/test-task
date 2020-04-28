import React from 'react';
import { Formik, Field } from 'formik';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import Form from '../../lib/FormNoEnter';
import { fetchTransfers } from './transfersSlice';
import { fetchAccounts, selectAccounts } from '../accounts/accountsSlice';
import store from '../../app/store';
import axiosCSRF from '../../lib/axiosCSRF';
import noty from '../../lib/noty';

const NewTransferForm = () => {
  const accounts = useSelector(selectAccounts);

  const handleSubmit = (values) => {
    return axiosCSRF
      .post('/api/transfers', values)
      .then(function () {
        store.dispatch(fetchAccounts());
        store.dispatch(fetchTransfers());
        noty('Successfully transferred money');
      })
      .catch(function (error) {
        noty(
          JSON.stringify(
            get(
              error,
              'response.data.errors',
              'Error occured. Please try one more time'
            )
          ),
          'error'
        );
      });
  };

  return (
    <Formik
      initialValues={{
        transfer: {
          account_from_id: '',
          account_to_id: '',
          amount: ''
        }
      }}
      onSubmit={handleSubmit}
      render={({ isSubmitting }) => (
        <Form>
          <p>
            Source Account:
            <br />
            <Field
              name="transfer.account_from_id"
              placeholder="account_from_id"
              as="select"
            >
              <option>Select Source Account</option>
              {accounts.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.person_name}
                </option>
              ))}
            </Field>
          </p>
          <p>
            Destination Account:
            <br />
            <Field
              name="transfer.account_to_id"
              placeholder="account_to_id"
              as="select"
            >
              <option>Select Destination Account</option>
              {accounts.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.person_name}
                </option>
              ))}
            </Field>
          </p>
          <p>
            Amount:
            <br />
            <Field type="text" name="transfer.amount" placeholder="amount" />
          </p>
          <p>
            <button type="submit" disabled={isSubmitting}>
              Create Transfer
            </button>
          </p>
          {isSubmitting && <i>..Submitting..</i>}
        </Form>
      )}
    />
  );
};

export default NewTransferForm;
