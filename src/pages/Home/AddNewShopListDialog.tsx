import { Plus, X } from '@/assets/Icons';
import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import FormikSelect from '@/components/formikInputs/FormikSelect';
import Notification from '@/components/Notification';
import Dialog from '@/components/Dialog';
import { db } from '@/configurations/firebase';
import Constants from '@/constants/Constants';
import Enums from '@/constants/Enums';
import { newShoppingListValidate, newShoppingListValidationSchema } from '@/constants/Validations';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useProductContext } from '@/contexts/product/ProductContext';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const AddNewShopListDialog: React.FC<{ setIsAddListDialogOpen: (e: any) => void; isAddListDialogOpen: boolean }> = ({ isAddListDialogOpen, setIsAddListDialogOpen }) => {
  const { userInfo } = useAuthContext();
  const { getAllShoppingList } = useProductContext();
  const { t } = useLocalizeContext();
  const { success, error } = Notification();

  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: newShoppingListValidationSchema,
    validate: values => newShoppingListValidate(values, addProduct),
    initialValues: {
      shoppingListName: '',
      dateToShop: '',
      productName: '',
      productQuantity: '',
      productCategory: '',
      productBrand: '',
      note: '',
      quantityType: Enums.QuantityType.Kg,
    },
    onSubmit: async values => {
      setLoading(true);
      const listId = uuidv4();
      const productId = uuidv4();
      const editedValues = {
        createDateTime: dayjs(Timestamp.now().toDate()).format('DD.MM.YYYY HH:mm:ss'),
        lastUpdateDateTime: dayjs(Timestamp.now().toDate()).format('DD.MM.YYYY HH:mm:ss'),
        creatorId: userInfo?.uid,
        homeId: userInfo?.includingHouse,
        lastUpdaterId: userInfo?.uid,
        dateToShop: values.dateToShop && dayjs(values.dateToShop).format('YYYY-MM-DD'),
        shoppingListId: listId,
        shoppingListName: values.shoppingListName,
        ...(addProduct && {
          shoppingList: [{
            createDateTime: dayjs(Timestamp.now().toDate()).format('DD.MM.YYYY HH:mm:ss'),
            creatorId: userInfo?.uid,
            lastUpdateDateTime: dayjs(Timestamp.now().toDate()).format('DD.MM.YYYY HH:mm:ss'),
            lastUpdaterId: userInfo?.uid,
            note: values.note,
            productBrand: values.productBrand,
            productCategory: values.productCategory,
            productId,
            isItBought: false,
            buyDate: '',
            productName: values.productName,
            productQuantity: values.productQuantity && +values.productQuantity,
            quantityType: values.quantityType,
          }],
        }),
      };
      try {
        await setDoc(
          doc(db, 'shopping-list', listId),
          editedValues,
        );
        success('Shopping List added successfully');
        getAllShoppingList();
        setIsAddListDialogOpen(false);
      } catch (catchError) {
        error('Error setting document');
        console.error('Error setting document:', catchError);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Dialog open={isAddListDialogOpen} onClose={() => setIsAddListDialogOpen((prev: any) => !prev)}>
      <div>
        <p className="mb-4 text-center text-3xl font-bold">{t('Add New Shopping List')}</p>
      </div>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex flex-col">
          <FormikInput id="shoppingListName" formik={formik} label="Shopping List Name" type="text" />
          <FormikInput id="dateToShop" formik={formik} label="Planned Shopping Date" type="date" />
          {/* <FormikDatePicker id="dateToShop" formik={formik} label="Planned Shopping Date" /> */}
          {!addProduct && (
            <Button type="button" className="mb-4 self-end" onClick={() => setAddProduct(true)}>
              <span className="flex gap-2">
                <Plus className="size-5" />
                {t('Add Product')}
              </span>
            </Button>
          )}
          {addProduct && (
            <div className="mb-4 flex flex-col rounded-md border-2 border-tra-neutral-grey p-4">
              <Button variant="outlined" size="icon" className="h-10 max-h-10 min-h-10 self-end border-error text-error" onClick={() => setAddProduct(false)}><X className="size-4" /></Button>
              <FormikInput id="productName" formik={formik} label="Product Name" type="text" />
              <div className="grid grid-cols-4 space-x-3">
                <FormikInput className="col-span-2 md:col-span-3" id="productQuantity" formik={formik} label="Product Quantity" type="number" />
                <FormikSelect
                  className="col-span-2 w-full md:col-span-1"
                  id="quantityType"
                  label="Quantity Type"
                  formik={formik}
                  options={Constants.ProductTypeOptionlist}
                />
              </div>
              <FormikSelect
                id="productCategory"
                label="Product Category"
                formik={formik}
                options={Object.entries(Enums.ProductCategory).map(([key, value]) => ({
                  value: key,
                  content: value,
                }))}
              />
              <FormikInput id="productBrand" formik={formik} label="Product Brand" type="text" />
              <FormikInput id="note" formik={formik} label="Note" type="text" />
            </div>
          )}
          <Button className="self-end" size="lg" color="tetriary" loading={loading}>{t('Save')}</Button>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default AddNewShopListDialog;
