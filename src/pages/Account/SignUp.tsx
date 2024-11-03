import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import { signUpValidationSchema } from '@/constants/Validations';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Form, Formik, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useState } from 'react';

const SignUp = () => {
  const { t } = useLocalizeContext();
  const { signUp } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: signUpValidationSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        await signUp(values);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });
  return (
    <div className="flex w-1/2 flex-col items-center justify-center gap-8 rounded-xl border-2 border-tra-neutral-grey py-10">
      <p className="text-4xl font-semibold">{t('Sign Up')}</p>
      <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Form className="flex w-2/3 flex-col">
          <FormikInput id="firstName" formik={formik} label={t('First Name')} type="text" />
          <FormikInput id="lastName" formik={formik} label={t('Last Name')} type="text" />
          <FormikInput id="email" formik={formik} label={t('Email')} type="email" />
          <FormikInput id="password" formik={formik} label={t('Password')} type="password" />
          <Button variant="solid" color="secondary" loading={loading} type="submit">{t('Send')}</Button>
          <Link to="/login" className="self-end">{t('Do you have an account?')}</Link>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
