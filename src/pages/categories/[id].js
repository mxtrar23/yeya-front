import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import FormRegisters from '@common/FormRegisters';

export default function PreviewCategory() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.registers.edit(id));
      setProduct(response.data);
    }
    getProduct()
      .then((res) => {
        setLoading(false);
        setProduct(res);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [router?.isReady]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Not Found: request failed</h1>;
  }

  return <FormRegisters product={product} />;
}
