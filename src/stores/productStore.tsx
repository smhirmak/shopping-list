/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/configurations/firebase';

interface ProductStore {
  selectedShoppingList: { state: boolean; id: string }
  allShoppingList: any[],
  shoppingList: any | null,
  selectedProduct: { state: boolean; data: string; documentId: string }
  editShoppingList?: { state: boolean; data: string }
  getAllShoppingList: (homeId?: string) => Promise<void>
}

const useProductStore = create<ProductStore>(set => ({
  selectedShoppingList: { state: false, id: '' },
  allShoppingList: [],
  shoppingList: null,
  selectedProduct: { state: false, data: '', documentId: '' },
  editShoppingList: { state: false, data: '' },
  getAllShoppingList: async (homeId?: string) => {
    try {
      if (!homeId) {
        set({ allShoppingList: [] });
        return;
      }

      const shoppingListRef = collection(db, 'shopping-list');
      const q = query(shoppingListRef, where('homeId', '==', homeId));
      const querySnapshot = await getDocs(q);
      const documentsArray: any[] = [];
      querySnapshot.forEach(document => {
        documentsArray.push(document.data());
      });
      set({ allShoppingList: documentsArray });
    } catch (error) {
      console.error('Error getting documents:', error);
      set({ allShoppingList: [] });
    }
  },

}));

export default useProductStore;
