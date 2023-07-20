import axios from 'axios';
import endPoints from '@services/api';

const addCategory = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.categories.create, body, config);

  return response.data;
};

export { addCategory };
