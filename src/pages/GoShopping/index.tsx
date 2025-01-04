import Button from '@/components/Button';
import ShoppingList from '@/components/ShoppingList';
import { db } from '@/configurations/firebase';
import Enums from '@/constants/Enums';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useProductContext } from '@/contexts/product/ProductContext';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoShopping = () => {
  const location = useLocation();
  const { t } = useLocalizeContext();
  const navigate = useNavigate();
  const { getShoppingListById, shoppingList } = useProductContext();
  const [shoppingListId, setShoppingListId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('shoppingListId');
    setShoppingListId(id);
    if (id) getShoppingListById(id);
  }, [location.search]);

  const toggleItemBoughtStatus = async (listId: string, itemId: string) => {
    try {
      const shoppingListRef = doc(db, 'shopping-list', listId);
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

  const formatDate = (dateString: string) => {
    const [month, day, year] = dateString.split('/');
    return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
  };

  return (
    <div>
      <div className="mt-4 flex size-full flex-col items-center justify-center space-y-4">
        <div className="relative flex w-fit flex-col justify-center space-y-2 rounded-lg bg-tra-neutral-dark-white px-7 py-10 shadow-lg" id="checklist">
          <span className="block text-center text-3xl font-semibold text-tra-neutral-light-black">{shoppingList?.shoppingListName}</span>
          <span className="ml-2 self-end text-sm text-tra-neutral-white">
            {shoppingList?.dateToShop ? `(${formatDate(shoppingList.dateToShop)})` : ''}
          </span>
          {shoppingList?.shoppingList?.map((product: {
            productId: string; productName: string; productBrand: string; productQuantity: number;
            quantityType: keyof typeof Enums.QuantityTypeLabel; isItBought: boolean
          }) => (
            <ShoppingList
              key={product.productId}
              id={product.productId}
              label={`${product.productName}${product.productBrand ? ` (${product.productBrand})` : ''} - ${product.productQuantity} ${t(Enums.QuantityTypeLabel[product.quantityType])}`}
              checked={product.isItBought}
              onChange={handleItemChange}
            />
          ))}
        </div>
        <Button onClick={() => navigate('/')}>{t('Finish Shopping')}</Button>
      </div>
    </div>
  );
};

export default GoShopping;
