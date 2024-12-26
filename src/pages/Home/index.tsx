import Button from '@/components/Button';
import Container from '@/components/Container';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useState } from 'react';
import { useProductContext } from '@/contexts/product/ProductContext';
import { ArrowClockwise, Funnel } from '@/assets/Icons';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import Tooltip from '@/components/Tooltip';
import ShoppingListTable from './ShoppingListTable';
import AddNewProductDialog from './AddNewProductDialog';
import AddNewShopListDialog from './AddNewShopListDialog';
import EditProductDialog from './EditProductDialog';
import EditShoppingListDialog from './EditShoppingListDialog';

const Home = () => {
  const { selectedShoppingList, getAllShoppingList, allShoppingList, selectedProduct, editShoppingList } = useProductContext();
  const { t } = useLocalizeContext();
  const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { userInfo } = useAuthContext();

  return (
    <Container maxWidth="xl">
      {userInfo?.includingHouse
        ? (
          <>
            <div className="mb-4 flex items-center justify-between md:justify-end">
              <Button size="icon" className="md:hidden" onClick={() => setMobileFilterOpen(prev => !prev)}>
                <Funnel className="size-6" />
              </Button>
              <div className="flex items-center gap-4">
                <Tooltip position="bottom" content={t('Refresh the shopping list')}>
                  <Button size="icon" className="group bg-transparent hover:bg-transparent" onClick={() => getAllShoppingList()}>
                    <ArrowClockwise className="size-6 text-tra-neutral-black transition-all hover:rotate-90" />
                  </Button>

                </Tooltip>
                <Button variant="solid" onClick={() => setIsAddListDialogOpen(true)}>{t('Add List')}</Button>
              </div>
            </div>
            <ShoppingListTable mobileFilterOpen={mobileFilterOpen} rowData={allShoppingList} />
            {isAddListDialogOpen && (
            <AddNewShopListDialog isAddListDialogOpen={isAddListDialogOpen} setIsAddListDialogOpen={setIsAddListDialogOpen} />
            )}
            {selectedShoppingList?.state && <AddNewProductDialog />}
            {selectedProduct?.state && <EditProductDialog />}
            {editShoppingList.state && <EditShoppingListDialog />}
          </>
        ) : (
          <div className="mt-20 flex w-full items-center justify-center text-center">
            <p className="text-4xl md:w-2/3">{t('To add and view a shopping list, please add a house from the profile page')}</p>
          </div>
        )}
    </Container>
  );
};

export default Home;
