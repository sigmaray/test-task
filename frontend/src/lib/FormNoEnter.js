import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';

const onKeyDown = function (keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
};

const FormNoEnter = function (props) {
  return (
    <Form onKeyDown={onKeyDown} {...props}>
      {props.children}
    </Form>
  );
};

FormNoEnter.propTypes = {
  children: PropTypes.node
};

export default FormNoEnter;
