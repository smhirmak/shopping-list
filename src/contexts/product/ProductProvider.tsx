import React, { useMemo } from 'react';
import { ProductContext } from './ProductContext';

const ProductProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const values = useMemo(
    () => ({ }),
    [],
  );

  return (
    <ProductContext.Provider value={values}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
