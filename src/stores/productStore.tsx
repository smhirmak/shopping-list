/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/configurations/firebase';
import { ShoppingProduct } from '@/types/types';

interface ProductStore {
  selectedShoppingList: { state: boolean; id: string }
  allShoppingList: any[],
  shoppingList: any | null,
  selectedProduct: { state: boolean; data: ShoppingProduct | null; documentId: string }
  editShoppingList: { state: boolean; data: string }
  getAllShoppingList: (homeId?: string) => Promise<void>
  updateSelectedShoppingList: (updates: Partial<ProductStore['selectedShoppingList']>) => void;
  updateSelectedProduct: (updates: Partial<ProductStore['selectedProduct']>) => void;
  updateEditShoppingList: (updates: Partial<ProductStore['editShoppingList']>) => void;
}

const useProductStore = create<ProductStore>(set => ({
  selectedShoppingList: { state: false, id: '' },
  allShoppingList: [],
  shoppingList: null,
  selectedProduct: { state: false, data: null, documentId: '' },
  editShoppingList: { state: false, data: '' },
  updateSelectedShoppingList: (updates) =>
    set((state) => {
      // if (state.selectedShoppingList === null) {
      //   return state; // Veya hata log'la
      // }

      return {
        selectedShoppingList: {
          ...state.selectedShoppingList,
          ...updates,
        },
      };
    }),
  updateSelectedProduct: (updates) =>
    set((state) => {
      // if (state.selectedProduct === null) {
      //   return state; // Veya hata log'la
      // }

      return {
        selectedProduct: {
          ...state.selectedProduct,
          ...updates,
        },
      };
    }),
  updateEditShoppingList: (updates) =>
    set((state) => {
      // if (state.editShoppingList === null) {
      //   return state; // Veya hata log'la
      // }

      return {
        editShoppingList: {
          ...state.editShoppingList,
          ...updates,
        },
      };
    }),
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

  getShoppingListById: async (id: string) => {
    try {
      const docRef = doc(db, 'shopping-list', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ shoppingList: docSnap.data() });
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  },

}));

export default useProductStore;
