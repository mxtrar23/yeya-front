import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
  const [data, setdata] = useState(false);

  async function fetchGetData() {
    const response = await axios.get(endpoint);
    setdata(response.data);
  }

  useEffect(() => {
    try {
      fetchGetData();
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, []);

  return data;
};

export default useFetch;
