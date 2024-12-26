/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/configurations/firebase';
import { ProductContext } from './ProductContext';
import { useAuthContext } from '../auth/AuthContext';

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedShoppingList, setSelectedShoppingList] = useState<{ state: boolean; id: string }>({ state: false, id: '' });
  const [selectedProduct, setSelectedProduct] = useState<{ state: boolean; data: string; documentId: string }>({ state: false, data: '', documentId: '' });
  const [allShoppingList, setAllShoppingList] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<any>(null);
  const [editShoppingList, setEditShoppingList] = useState<{ state: boolean; data: string }>({ state: false, data: '' });
  const { userInfo } = useAuthContext();

  // Add useEffect for initial data fetch

  const getAllShoppingList = async () => {
    try {
      if (!userInfo?.includingHouse) {
        setAllShoppingList([]);
        return;
      }

      const shoppingListRef = collection(db, 'shopping-list');
      const q = query(
        shoppingListRef,
        where('homeId', '==', userInfo.includingHouse),
      );

      const querySnapshot = await getDocs(q);
      const documentsArray: any[] = [];
      querySnapshot.forEach(document => {
        documentsArray.push(document.data());
      });
      setAllShoppingList(documentsArray);
    } catch (error) {
      console.error('Error getting documents:', error);
      setAllShoppingList([]);
    }
  };

  useEffect(() => {
    if (userInfo?.includingHouse) {
      getAllShoppingList();
    }
  }, [userInfo?.includingHouse]);

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
