import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import Notification from '@/components/Notification';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { db } from '@/configurations/firebase';
import { addNewHomeValidationSchema } from '@/constants/Validations';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Dialog } from '@radix-ui/react-dialog';
import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface AddHomeDialogProps {
  addHomeDialog: boolean;
  setAddHomeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddHomeDialog: React.FC<AddHomeDialogProps> = ({ addHomeDialog, setAddHomeDialog }) => {
  const { userInfo, editUser, getUserInfo } = useAuthContext();
  const { t } = useLocalizeContext();
  const { success, error } = Notification();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: addNewHomeValidationSchema,
    initialValues: {
      name: '',
      members: [userInfo?.uid],
      ownerId: userInfo?.uid,
    },
    onSubmit: async values => {
      setLoading(true);
      const homeId = uuidv4();
      const editedValues = {
        ...values,
        homeId,
      };
      console.log(editedValues);
      try {
        await setDoc(
          doc(db, 'homes', homeId),
          editedValues,
        ).then(() => {
          editUser(userInfo!.uid, userInfo!.firstName, userInfo!.lastName, homeId);
        });
        success('New Home added successfully');
        getUserInfo();
        setAddHomeDialog(false);
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
    <Dialog open={addHomeDialog} onOpenChange={() => setAddHomeDialog(prev => !prev)}>
      <DialogContent className="max-h-[90vh] min-w-[50vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{t('Add New Home')}</DialogTitle>
        </DialogHeader>
        <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
          <Form className="flex flex-col">
            <FormikInput id="name" formik={formik} label="Home Name" type="text" />
            <Button className="self-end" color="tetriary" loading={loading} type="submit">{t('Save')}</Button>
          </Form>
        </Formik>

      </DialogContent>
    </Dialog>
  );
};

export default AddHomeDialog;
