import axios from 'axios';
import endPoints from '@services/api';

const addRegisters = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.registers.create, body, config);

  return response.data;
};

const getMyRegisters = async () => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.get(endPoints.registers.list, {}, config);

  return response.data;
};

const deleteRegister = async (id) => {
  const response = await axios.delete(endPoints.registers.delete(id));
  return response;
};

export { addRegisters, getMyRegisters, deleteRegister };
