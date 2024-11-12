import { resetPasswordValidationSchema } from '@/constants/Validations';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Form, Formik, useFormik } from 'formik';
import FormikInput from '@/components/formikInputs/FormikInput';
import Button from '@/components/Button';
import { useState } from 'react';
import { useAuthContext } from '@/contexts/auth/AuthContext';

const ResetPassword = () => {
  const { t } = useLocalizeContext();
  const { resetPassword } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: resetPasswordValidationSchema,
    initialValues: {
      email: '',
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        await resetPassword(values.email);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });
  return (
    <div className="flex w-1/2 flex-col items-center justify-center gap-8 rounded-xl border-2 border-tra-neutral-grey py-20">
      <p className="text-4xl font-semibold">{t('Reset Password')}</p>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex w-2/3 flex-col">
          <FormikInput id="email" formik={formik} label={t('Email')} type="email" />
          <Button variant="solid" color="secondary" loading={loading} type="submit">{t('Save')}</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;
