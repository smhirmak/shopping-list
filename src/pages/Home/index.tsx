import Button from '@/components/Button';
import Container from '@/components/Container';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useState } from 'react';
import { useProductContext } from '@/contexts/product/ProductContext';
import { ArrowClockwise, ArrowsDownUp, ClearSorting, Funnel } from '@/assets/Icons';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import Tooltip from '@/components/Tooltip';
import Select from '@/components/Select';
import { SortingState } from '@tanstack/react-table';
import ShoppingListTable from './ShoppingListTable';
import AddNewProductDialog from './AddNewProductDialog';
import AddNewShopListDialog from './AddNewShopListDialog';
import EditProductDialog from './EditProductDialog';
import EditShoppingListDialog from './EditShoppingListDialog';

const Home = () => {
  const { selectedShoppingList, getAllShoppingList, allShoppingList, selectedProduct, editShoppingList } = useProductContext();
  const { t } = useLocalizeContext();
  const { userInfo } = useAuthContext();
  const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'dateToShop', desc: false }]);

  return (
    <Container maxWidth="xl">
      {userInfo?.includingHouse
        ? (
          <>
            <div className="mb-4 flex flex-col gap-4 md:justify-end">
              <div className="flex items-center justify-between gap-4 md:self-end">
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
              <div className="flex justify-between gap-4">
                <Select
                  size="sm"
                  selectClassName="h-10"
                  className="w-full min-w-28 md:hidden"
                  onChange={e => setSorting(e)}
                  options={[
                    { content: t('Shop Date (Ascending)'), value: [{ id: 'dateToShop', desc: false }] },
                    { content: t('Shop Date (Descending)'), value: [{ id: 'dateToShop', desc: true }] },
                    { content: t('Name (A-Z)'), value: [{ id: 'shoppingListName', desc: false }] },
                    { content: t('Name (Z-A)'), value: [{ id: 'shoppingListName', desc: true }] },
                    { content: t('Create Date (Ascending)'), value: [{ id: 'createDateTime', desc: false }] },
                    { content: t('Create Date (Descending)'), value: [{ id: 'createDateTime', desc: true }] },
                  ]}
                  placeHolder={t('Sort by')}
                />
                {sorting?.length > 0 && (
                <Button className="bg-transparent hover:bg-transparent md:hidden" size="icon" onClick={() => setSorting([])}>
                  <ClearSorting className="size-6" />
                </Button>
                )}
              </div>
            </div>
            <ShoppingListTable
              mobileFilterOpen={mobileFilterOpen}
              rowData={allShoppingList}
              sorting={sorting}
              setSorting={setSorting}
            />
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
