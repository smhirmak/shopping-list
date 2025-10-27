import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import Notification from '@/components/Notification';
import { updatePasswordValidationSchema } from '@/constants/Validations';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import useAuthStore from '@/stores/authStore';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';

const Settings = () => {
  const userInfo = useAuthStore(state => state.userInfo);
  const updateUserPassword = useAuthStore(state => state.updateUserPassword);
  const { t } = useLocalizeContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = Notification();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: updatePasswordValidationSchema,
    initialValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    onSubmit: async values => {
      if (values.newPassword !== values.newPasswordAgain) {
        error(t('Passwords do not match'));
        return;
      }
      setLoading(true);
      try {
        const result = await updateUserPassword(userInfo!.email, values.currentPassword, values.newPassword);
        if (result.status === 'success') {
          success(t(result.message || 'Password updated successfully'));
        } else {
          error(t(result.message || 'Error updating password'));
        }
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
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-xl py-10">
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex w-5/6 flex-col md:w-2/3">
          <FormikInput id="currentPassword" label="Current Password" formik={formik} type="password" />
          <FormikInput id="newPassword" label="New Password" formik={formik} type="password" />
          <FormikInput id="newPasswordAgain" label="New Password (Again)" formik={formik} type="password" />
          <Button className="mt-4 self-end" color="tetriary" loading={loading}>{t('Save')}</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Settings;
