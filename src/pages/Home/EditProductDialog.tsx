import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import FormikSelect from '@/components/formikInputs/FormikSelect';
import Notification from '@/components/Notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { db } from '@/configurations/firebase';
import Constants from '@/constants/Constants';
import Enums from '@/constants/Enums';
import { deleteProductPopup } from '@/constants/PopupContents';
import { editProductValidationSchema } from '@/constants/Validations';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useProductContext } from '@/contexts/product/ProductContext';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';
import Swal from 'sweetalert2';

const EditProductDialog = () => {
  const { t } = useLocalizeContext();
  const { userInfo } = useAuthContext();
  const { selectedProduct, setSelectedProduct, getAllShoppingList } = useProductContext();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const productInfo = selectedProduct.data;

  const handleDelete = async () => {
    const areYouSure = await Swal.fire(deleteProductPopup(t));

    if (areYouSure.isConfirmed) {
      setDeleteLoading(true);
      try {
        const docRef = doc(db, 'shopping-list', selectedProduct?.documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const { shoppingList } = data;

          const updatedShoppingList = shoppingList.filter((item: any) => item.productId !== selectedProduct?.data.productId);

          await updateDoc(docRef, {
            shoppingList: updatedShoppingList,
          });

          Notification.success('Product successfully deleted');
          setSelectedProduct((prev: any) => ({ ...prev, state: false, data: '' }));
          getAllShoppingList();
        } else {
          Notification.error('Document not found!');
        }
      } catch (error) {
        Notification.error('An error occurred');
        console.error('Error occurred:', error);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: editProductValidationSchema,
    initialValues: {
      productName: productInfo?.productName,
      productQuantity: productInfo?.productQuantity,
      productCategory: productInfo?.productCategory,
      productBrand: productInfo?.productBrand,
      note: productInfo?.note,
      quantityType: productInfo.quantityType,
      createDateTime: productInfo.createDateTime,
      creatorId: productInfo.creatorId,
      productId: productInfo.productId,
    },
    onSubmit: async values => {
      setSubmitLoading(true);
      const editedValues = {
        ...values,
        lastUpdateDateTime: Timestamp.now().toDate().toLocaleString(),
        lastUpdaterId: userInfo?.uid,
        productQuantity: values.productQuantity && +values.productQuantity,
        isItBought: false,
        buyDate: '',
      };

      try {
        const docRef = doc(db, 'shopping-list', selectedProduct?.documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const { shoppingList } = data;

          const updatedShoppingList = shoppingList.map((item: any) => {
            if (item.productId === values.productId) {
              return { ...item, ...editedValues };
            }
            return item;
          });

          await updateDoc(docRef, {
            shoppingList: updatedShoppingList,
          });

          Notification.success('Product successfully edited');
          setSelectedProduct(prev => ({ ...prev, state: false, data: '' }));
          getAllShoppingList();
        } else {
          Notification.error('Belge bulunamadı!');
        }
      } catch (error) {
        Notification.error('An error occurred');
        console.error('Hata oluştu:', error);
      } finally {
        setSubmitLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });
  return (
    <Dialog open={selectedProduct.state} onOpenChange={() => setSelectedProduct((prev: { state: boolean; data: string; documentId: string }) => ({ ...prev, state: !prev.state }))}>
      <DialogContent className="max-h-[90vh] min-w-[50vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{t('Edit Product')}</DialogTitle>
        </DialogHeader>
        <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
          <Form>
            <FormikInput id="productName" formik={formik} label="Product Name" type="text" />
            <div className="grid grid-cols-4 space-x-3">
              <FormikInput className="col-span-3" id="productQuantity" formik={formik} label="Product Quantity" type="number" />
              <FormikSelect id="quantityType" label="Quantity Type" formik={formik} optionsList={Constants.ProductTypeOptionlist} placeholder="Please select a quantity type" />
            </div>
            <FormikSelect
              id="productCategory"
              label="Product Category"
              formik={formik}
              optionsList={Object.entries(Enums.ProductCategory).map(([key, value]) => ({
                value: key,
                content: value,
              }))}
            />
            <FormikInput id="productBrand" formik={formik} label="Product Brand" type="text" />
            <FormikInput id="note" formik={formik} label="Note" type="text" />
            <div className="flex justify-between">
              <Button color="tetriary" loading={submitLoading}>{t('Save')}</Button>
              <Button onClick={handleDelete} loading={deleteLoading} type="button" className="bg-error hover:bg-error/80">{t('Delete')}</Button>
            </div>
          </Form>
        </Formik>

      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
