import Button from '@/components/Button';
import Container from '@/components/Container';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useEffect, useState } from 'react';
import { useProductContext } from '@/contexts/product/ProductContext';
import { ArrowClockwise } from '@/assets/Icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ShoppingListTable from './ShoppingListTable';
import AddNewProductDialog from './AddNewProductDialog';
import AddNewShopListDialog from './AddNewShopListDialog';
import EditProductDialog from './EditProductDialog';
import EditShoppingListDialog from './EditShoppingListDialog';

const Home = () => {
  const { selectedShoppingList, getAllShoppingList, allShoppingList, selectedProduct, editShoppingList } = useProductContext();
  const { t } = useLocalizeContext();
  const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false);

  useEffect(() => {
    getAllShoppingList();
  }, []);

  return (
    <Container maxWidth="xl">

      <div className="flex items-center justify-end gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button size="icon" className="group bg-transparent hover:bg-transparent" onClick={() => getAllShoppingList()}>
                <ArrowClockwise className="size-6 transition-all hover:rotate-90" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {t('Refresh the shopping list')}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button variant="solid" onClick={() => setIsAddListDialogOpen(true)}>{t('Add List')}</Button>
      </div>
      <ShoppingListTable rowData={allShoppingList} />
      {isAddListDialogOpen && (
        <AddNewShopListDialog isAddListDialogOpen={isAddListDialogOpen} setIsAddListDialogOpen={setIsAddListDialogOpen} />
      )}
      {selectedShoppingList?.state && <AddNewProductDialog />}
      {selectedProduct?.state && <EditProductDialog />}
      {editShoppingList.state && <EditShoppingListDialog />}
    </Container>
  );
};

export default Home;
