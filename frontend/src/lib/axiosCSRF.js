import axios from 'axios';

const token = document.querySelector('[name="csrf-token"]') || {
  content: 'no-csrf-token'
};

export default axios.create({
  headers: {
    common: {
      'X-CSRF-Token': token.content
    }
  }
});
