import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import FormikSelect from '@/components/formikInputs/FormikSelect';
import Notification from '@/components/Notification';
import Dialog from '@/components/Dialog';
import { db } from '@/configurations/firebase';
import Constants from '@/constants/Constants';
import Enums from '@/constants/Enums';
import { newProductValidationSchema } from '@/constants/Validations';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useProductContext } from '@/contexts/product/ProductContext';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const AddNewProductDialog = () => {
  const { selectedShoppingList, setSelectedShoppingList, getAllShoppingList } = useProductContext();
  const { userInfo } = useAuthContext();
  const { t } = useLocalizeContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = Notification();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: newProductValidationSchema,
    initialValues: {
      productName: '',
      productQuantity: '',
      productCategory: Object.keys(Enums.ProductCategory)[0],
      productBrand: '',
      note: '',
      quantityType: Enums.QuantityType.Kg,
    },
    onSubmit: async values => {
      setLoading(true);
      const productId = uuidv4();
      const editedValues = {
        ...values,
        createDateTime: dayjs(Timestamp.now().toDate()).format('DD.MM.YYYY HH:mm:ss'),
        creatorId: userInfo?.uid,
        lastUpdateDateTime: dayjs(Timestamp.now().toDate()).format('DD.MM.YYYY HH:mm:ss'),
        lastUpdaterId: userInfo?.uid,
        productId,
        isItBought: false,
        buyDate: '',
        productQuantity: values.productQuantity && +values.productQuantity,
      };
      try {
        await updateDoc(doc(db, 'shopping-list', selectedShoppingList.id), {
          shoppingList: arrayUnion(editedValues),
        });
        success('Product added successfully in list');
        getAllShoppingList();
        setSelectedShoppingList(prev => ({ ...prev, state: false }));
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
    <Dialog open={selectedShoppingList.state} size="lg" onClose={() => setSelectedShoppingList((prev: { state: boolean; id: string }) => ({ ...prev, state: !prev.state }))}>
      <div>
        <p className="mb-4 text-center text-3xl font-bold">{t('Add New Product to List')}</p>
      </div>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex flex-col">
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
          <Button className="self-end" color="tetriary" loading={loading}>{t('Save')}</Button>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default AddNewProductDialog;
