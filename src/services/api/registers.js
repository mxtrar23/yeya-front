import axios from 'axios';
import endPoints from '@services/api';

const addRegisters = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'aplication/json',
    },
  };
  const response = await axios.post(endPoints.registers.create, body, config);

  return response.data;
};

export { addRegisters };
