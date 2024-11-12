import React, { useMemo, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/configurations/firebase';
import { ProductContext } from './ProductContext';

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedShoppingList, setSelectedShoppingList] = useState<{ state: boolean; id: string }>({ state: false, id: '' });
  const [selectedProduct, setSelectedProduct] = useState<{ state: boolean; data: string; documentId: string }>({ state: false, data: '', documentId: '' });
  const [allShoppingList, setAllShoppingList] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<any>(null);
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

  const getShoppingListById = async (id: string) => {
    try {
      const docRef = doc(db, 'shopping-list', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setShoppingList(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
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
      shoppingList,
      setShoppingList,
      getShoppingListById,
    }),
    [selectedShoppingList, allShoppingList, selectedProduct, editShoppingList, shoppingList],
  );

  return (
    <ProductContext.Provider value={values}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
