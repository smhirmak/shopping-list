import React, { useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/configurations/firebase';
import { ProductContext } from './ProductContext';

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedShoppingList, setSelectedShoppingList] = useState<{ state: boolean; id: string }>(null);
  const [selectedProduct, setSelectedProduct] = useState<{ state: boolean; data: string; documentId: string }>(null);
  const [allShoppingList, setAllShoppingList] = useState<any[]>([]);
  const [editShoppingList, setEditShoppingList] = useState<{ state: boolean; data: string }>({ state: false, data: '' });

  const getAllShoppingList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'shopping-list'));
      const documentsArray: any[] = [];
      querySnapshot.forEach(document => {
        documentsArray.push(document.data());
      });
      setAllShoppingList(documentsArray);
    } catch (error) {
      console.error('Error setting document:', error);
    }
  };

  const values = useMemo(
    () => ({
      selectedShoppingList,
      setSelectedShoppingList,
      allShoppingList,
      setAllShoppingList,
      getAllShoppingList,
      selectedProduct,
      setSelectedProduct,
      editShoppingList,
      setEditShoppingList,
    }),
    [selectedShoppingList, allShoppingList, selectedProduct, editShoppingList],
  );

  return (
    <ProductContext.Provider value={values}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
