import React from 'react';
import { Formik, Field } from 'formik';
import Form from '../../lib/FormNoEnter';
import { fetchAccounts } from './accountsSlice';
import { get } from 'lodash';

import store from '../../app/store';
import axiosCSRF from '../../lib/axiosCSRF';
import noty from '../../lib/noty';

const NewAccountForm = () => {
  const handleSubmit = (values) => {
    return axiosCSRF
      .post('/api/accounts', values)
      .then(function () {
        store.dispatch(fetchAccounts());
        noty('Account was created');
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
        account: {
          person_name: '',
          balance: ''
        }
      }}
      onSubmit={handleSubmit}
      render={({ isSubmitting }) => (
        <Form>
          <p>
            Person Name:
            <br />
            <Field
              type="text"
              name="account.person_name"
              placeholder="Person Name"
            />
          </p>
          <p>
            Balance:
            <br />
            <Field type="text" name="account.balance" placeholder="Balance" />
          </p>
          <p>
            <button type="submit" disabled={isSubmitting}>
              Create Account
            </button>
          </p>
          {isSubmitting && <i>..Submitting..</i>}
        </Form>
      )}
    />
  );
};

export default NewAccountForm;
