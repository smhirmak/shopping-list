import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import { loginValidationSchema } from '@/constants/Validations';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Form, Formik, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useState } from 'react';
import { Fish } from '@/assets/Icons';

const Login = () => {
  const { t } = useLocalizeContext();
  const { login } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: loginValidationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        await login(values);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-xl border-2 border-tra-neutral-grey py-10 md:w-1/2">
      <p className="text-4xl font-semibold">{t('Login')}</p>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex w-5/6 flex-col md:w-2/3">
          <FormikInput id="email" formik={formik} label="Email" type="email" />
          <FormikInput id="password" formik={formik} label="Password" type="password" />
          <Link to="/reset-password" className="mb-4 flex gap-2 self-end">
            Şifremi Unuttum
            <Fish className="size-6" />
          </Link>
          <Button variant="solid" color="secondary" loading={loading} type="submit">Gönder</Button>
          <Link to="/sign-up" className="mt-2 self-end">Hesabınız yok mu?</Link>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
