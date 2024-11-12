import { createContext, useContext } from 'react';

export interface ProductContextType {
  selectedShoppingList: { state: boolean; id: string };
  setSelectedShoppingList: React.Dispatch<React.SetStateAction<{ state: boolean; id: string }>>;
  allShoppingList: any[];
  setAllShoppingList: React.Dispatch<React.SetStateAction<any[]>>;
  getAllShoppingList: () => Promise<void>;
  selectedProduct: { state: boolean; data: any; documentId: string };
  setSelectedProduct: React.Dispatch<React.SetStateAction<{ state: boolean; data: string; documentId: string }>>;
  editShoppingList: { state: boolean; data: string };
  setEditShoppingList: React.Dispatch<React.SetStateAction<{ state: boolean; data: string }>>;
  shoppingList: any;
  setShoppingList: React.Dispatch<React.SetStateAction<any>>;
  getShoppingListById: (id: string) => Promise<void>;
}
const defaultProductContext: ProductContextType = {
  selectedShoppingList: { state: false, id: '' },
  setSelectedShoppingList: () => {},
  getAllShoppingList: async () => Promise.resolve(),
  getShoppingListById: async () => Promise.resolve(),
  shoppingList: [],
  setShoppingList: () => {},
  allShoppingList: [],
  setAllShoppingList: () => {},
  selectedProduct: { state: false, data: '', documentId: '' },
  setSelectedProduct: () => {},
  editShoppingList: { state: false, data: '' },
  setEditShoppingList: () => {},
};

export const ProductContext = createContext<ProductContextType>(defaultProductContext);

export const useProductContext = () => useContext(ProductContext);
