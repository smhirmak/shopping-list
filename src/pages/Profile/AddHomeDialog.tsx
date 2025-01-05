import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import Notification from '@/components/Notification';
import Dialog from '@/components/Dialog';
import { db } from '@/configurations/firebase';
import { addNewHomeValidationSchema } from '@/constants/Validations';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import emailjs from '@emailjs/browser';

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
      try {
        await setDoc(
          doc(db, 'homes', homeId),
          editedValues,
        ).then(() => {
          editUser(userInfo!.uid, userInfo!.firstName, userInfo!.lastName, homeId);
        });
        success('New Home added successfully');
        emailjs.send('service_yhsz8gn', 'template_qjisals', {
          to_name: userInfo?.firstName,
          key: homeId,
          to_email: userInfo?.email,
        }, '7yTLDKTfo6yvURYZ7').then(() => {
          success('Email sent successfully');
        }).catch(err => {
          error('Error sending email');
          console.error('Error sending email:', err);
        });
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
    <Dialog open={addHomeDialog} size="lg" onClose={() => setAddHomeDialog(prev => !prev)}>
      <div>
        <p className="mb-4 text-center text-3xl font-bold">{t('Create New Home')}</p>
      </div>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex flex-col">
          <FormikInput id="name" formik={formik} label="Home Name" type="text" />
          <Button className="self-end" color="tetriary" loading={loading} type="submit">{t('Save')}</Button>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default AddHomeDialog;
