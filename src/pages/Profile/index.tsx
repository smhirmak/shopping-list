import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import Notification from '@/components/Notification';
import TextField from '@/components/TextField';
import { updateUserInfoValidationSchema } from '@/constants/Validations';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';

const Profile = () => {
  const { userInfo, editUser, getUserInfo } = useAuthContext();
  const { t } = useLocalizeContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = Notification();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: updateUserInfoValidationSchema,
    initialValues: {
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
      includingHouse: userInfo?.includingHouse || '',
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        await editUser(userInfo!.uid, values.firstName, values.lastName, values.includingHouse);
        success('User updated successfully');
        getUserInfo();
      } catch (catchError) {
        error('Error updating user');
        console.error('Error updating user:', catchError);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-xl py-10 md:w-1/2">
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex w-5/6 flex-col md:w-2/3">
          <FormikInput id="firstName" label="First Name" formik={formik} />
          <FormikInput id="lastName" label="Last Name" formik={formik} />
          <FormikInput id="includingHouse" label="Including House" formik={formik} />
          <TextField label="Email" disabled value={userInfo?.email} />
          <Button className="mt-4 self-end" color="tetriary" loading={loading}>{t('Save')}</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Profile;
