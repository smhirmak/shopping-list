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

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: updateUserInfoValidationSchema,
    initialValues: {
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        await editUser(userInfo!.uid, values.firstName, values.lastName);
        Notification.success('User updated successfully');
        getUserInfo();
      } catch (error) {
        Notification.error('Error updating user');
        console.error('Error updating user:', error);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <div className="flex justify-center">
      <div className="w-3/5 border p-6">
        <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
          <Form className="flex flex-col">
            <FormikInput id="firstName" label="First Name" formik={formik} />
            <FormikInput id="lastName" label="Last Name" formik={formik} />
            <TextField label="Email" disabled value={userInfo?.email} />
            <Button className="mt-4 self-end" color="tetriary" loading={loading}>{t('Save')}</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
