import endPoints from '@services/api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@components/Pagination';

const PRODUCT_LIMIT = 20;

export function ProductCards() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [offsetProducts, setOffsetProducts] = useState(0);

  useEffect(() => {
    async function getProducts() {
      const { data: tenProducts } = await axios.get(endPoints.products.getProducts(PRODUCT_LIMIT, offsetProducts), offsetProducts);
      const { data: TotalProducts } = await axios.get(endPoints.products.getProducts(0, 0));
      setProducts(tenProducts);
      setTotalProducts(TotalProducts.length);
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [offsetProducts]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img src={product.images[0]} className="h-full w-full object-cover object-center group-hover:opacity-75" alt={product.title} />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      {totalProducts > 0 && <Pagination totalItems={totalProducts} itemsPerPage={PRODUCT_LIMIT} setOffset={setOffsetProducts} neighbours={3} />}
    </>
  );
}
