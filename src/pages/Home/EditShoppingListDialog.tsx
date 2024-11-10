import { Minus, Plus, X } from '@/assets/Icons';
import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import FormikSelect from '@/components/formikInputs/FormikSelect';
import Notification from '@/components/Notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

const EditShoppingListDialog = () => {
  const { userInfo, allUsersInfo } = useAuthContext();
  const { getAllShoppingList, setEditShoppingList, editShoppingList } = useProductContext();
  const { t } = useLocalizeContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { data } = editShoppingList;

  const formatDateToISO = dateString => {
    const [day, month, year] = dateString.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    const formattedYear = date.getFullYear();
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: newShoppingListValidationSchema,
    initialValues: {
      shoppingListName: data.shoppingListName,
      dateToShop: formatDateToISO(data.dateToShop),
    },
    onSubmit: async values => {
      setLoading(true);
      const editedValues = {
        ...values,
        dateToShop: values.dateToShop && new Date(values.dateToShop).toLocaleDateString(),
        lastUpdateDateTime: Timestamp.now().toDate().toLocaleString(),
        lastUpdaterId: userInfo?.uid,
      };
      try {
        const docRef = doc(db, 'shopping-list', data.shoppingListId);
        await setDoc(docRef, editedValues, { merge: true });
        setEditShoppingList(() => ({ state: false, data: '' }));
        getAllShoppingList();
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
    <Dialog open={editShoppingList} onOpenChange={() => setEditShoppingList(() => ({ state: false, data: '' }))}>
      <DialogContent className="max-h-[90vh] min-w-[50vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Edit Shopping List</DialogTitle>
        </DialogHeader>
        <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form className="flex flex-col">
            <FormikInput id="shoppingListName" formik={formik} label="Shopping List Name" type="text" />
            <FormikInput id="dateToShop" formik={formik} label="Planned Shopping Date" type="date" />
            <Button className="self-end" size="lg" color="tetriary" loading={loading}>{t('Save')}</Button>
          </Form>
        </Formik>
        {/* </DialogDescription> */}

      </DialogContent>
    </Dialog>
  );
};

export default EditShoppingListDialog;
