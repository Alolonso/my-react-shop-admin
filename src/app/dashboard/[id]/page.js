'use client';
import FormProduct from '@components/FormProduct';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import axios from 'axios';
import endPoints from '@services/api';

export default function Edit({ params }) {
  const { id } = params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getProduct() {
      const { data } = await axios.get(endPoints.products.getProduct(id));
      setProduct(data);
    }
    getProduct();
  }, [id]);

  // useEffect(() => {
  //   const { id } = router.query;
  //   if (!router.isReady) return;
  //   async function getProduct() {
  //     const response = await axios.get(endPoints.products.getProduct(id));
  //     setProduct(response.data);
  //   }
  //   getProduct();
  // }, [router?.isReady]);

  return <FormProduct product={product} />;
}
