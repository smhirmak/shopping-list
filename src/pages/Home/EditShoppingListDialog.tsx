import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import Dialog from '@/components/Dialog';
import { db } from '@/configurations/firebase';
import { editShoppingListValidationSchema } from '@/constants/Validations';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useProductContext } from '@/contexts/product/ProductContext';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';

const EditShoppingListDialog = () => {
  const { userInfo } = useAuthContext();
  const { getAllShoppingList, setEditShoppingList, editShoppingList } = useProductContext();
  const { t } = useLocalizeContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { data } = editShoppingList as { state: boolean; data: { shoppingListName: string; dateToShop: string; shoppingListId: string } | string };
  const shoppingListData = typeof data === 'string' ? { shoppingListName: '', dateToShop: '', shoppingListId: '' } : data;

  const formatDateToISO = (dateString: any) => {
    const [day, month, year] = dateString.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    const formattedYear = date.getFullYear();
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: editShoppingListValidationSchema,
    initialValues: {
      shoppingListName: shoppingListData.shoppingListName,
      dateToShop: formatDateToISO(shoppingListData.dateToShop),
    },
    onSubmit: async (values: { shoppingListName: string; dateToShop: string }) => {
      setLoading(true);
      const editedValues = {
        ...values,
        dateToShop: values.dateToShop && new Date(values.dateToShop).toLocaleDateString(),
        lastUpdateDateTime: Timestamp.now().toDate().toLocaleString(),
        lastUpdaterId: userInfo?.uid,
      };
      try {
        if (typeof data !== 'string') {
          const docRef = doc(db, 'shopping-list', data.shoppingListId);
          await setDoc(docRef, editedValues, { merge: true });
          setEditShoppingList(() => ({ state: false, data: '' }));
          getAllShoppingList();
        }
      } catch (error) {
        console.error('Error updating document: ', error);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Dialog open={editShoppingList.state} size="lg" onClose={() => setEditShoppingList(() => ({ state: false, data: '' }))}>
      <div>
        <p className="mb-4 text-center text-3xl font-bold">Edit Shopping List</p>
      </div>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex flex-col">
          <FormikInput id="shoppingListName" formik={formik} label="Shopping List Name" type="text" />
          <FormikInput id="dateToShop" formik={formik} label="Planned Shopping Date" type="date" />
          <Button className="self-end" size="lg" color="tetriary" loading={loading}>{t('Save')}</Button>
        </Form>
      </Formik>
      {/* </DialogDescription> */}

    </Dialog>
  );
};

export default EditShoppingListDialog;
