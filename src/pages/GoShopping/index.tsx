import ShoppingList from '@/components/ShoppingList';
import { db } from '@/configurations/firebase';
import Enums from '@/constants/Enums';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useProductContext } from '@/contexts/product/ProductContext';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GoShopping = () => {
  const location = useLocation();
  const { t } = useLocalizeContext();
  const { getShoppingListById, shoppingList } = useProductContext();
  const [shoppingListId, setShoppingListId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('shoppingListId');
    setShoppingListId(id);
    if (id) getShoppingListById(id);
  }, [location.search]);

  console.log(shoppingList);

  const toggleItemBoughtStatus = async (shoppingListId: string, itemId: string) => {
    try {
      const shoppingListRef = doc(db, 'shopping-list', shoppingListId);
      const shoppingListSnap = await getDoc(shoppingListRef);

      if (shoppingListSnap.exists()) {
        const shoppingListData = shoppingListSnap.data();

        const updatedShoppingList = shoppingListData.shoppingList.map((item: any) => {
          if (item.productId === itemId) {
            const newIsItBought = !item.isItBought;
            return {
              ...item,
              isItBought: newIsItBought,
              buyDate: newIsItBought ? Timestamp.now().toDate().toLocaleString() : item.buyDate,
            };
          }
          return item;
        });

        await updateDoc(shoppingListRef, { shoppingList: updatedShoppingList });
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleItemChange = async (itemId: string) => {
    if (shoppingListId) {
      await toggleItemBoughtStatus(shoppingListId, itemId);
      getShoppingListById(shoppingListId); // Refresh the shopping list
    }
  };

  return (
    <div>
      <div className="mt-4 flex size-full flex-col items-center justify-center space-y-4">
        <div className="relative w-fit items-center justify-center space-y-2 rounded-lg bg-white px-7 py-10 shadow-lg" id="checklist">
          <span className="text-2xl font-semibold text-red-500">{shoppingList?.shoppingListName}</span>
          <span className="ml-2 text-sm text-black">{`(${shoppingList?.dateToShop})`}</span>
          {shoppingList?.shoppingList?.map((product: { productId: string; productName: string; productBrand: string; productQuantity: number;
           quantityType: keyof typeof Enums.QuantityTypeLabel; isItBought: boolean }) => (
             <ShoppingList
               key={product.productId}
               id={product.productId}
               label={`${product.productName} (${product.productBrand}) - ${product.productQuantity} ${t(Enums.QuantityTypeLabel[product.quantityType])}`}
               checked={product.isItBought}
               onChange={handleItemChange}
             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoShopping;
