import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import { signUpValidationSchema } from '@/constants/Validations';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Form, Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Notification from '@/components/Notification';
import useAuthStore from '@/stores/authStore';
import { SignUpDRequest } from '@/types/types';

const SignUp = () => {
  const { t } = useLocalizeContext();
  const signUp = useAuthStore(state => state.signUp);
  const navigate = useNavigate();
  const { error, success } = Notification()

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
        const result = await signUp(values as SignUpDRequest);
        if (result.status === 'success') {
          navigate('/login');
          result.messages?.forEach(message => {
            success(message);
          });
        } else if (result.status === 'error') {
          result.messages?.forEach(message => {
            error(message);
          });
        }

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
      <p className="text-4xl font-semibold">{t('Sign Up')}</p>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex w-5/6 flex-col md:w-2/3">
          <FormikInput id="firstName" formik={formik} label={t('First Name')} type="text" />
          <FormikInput id="lastName" formik={formik} label={t('Last Name')} type="text" />
          <FormikInput id="email" formik={formik} label={t('Email')} type="email" />
          <FormikInput id="password" formik={formik} label={t('Password')} type="password" />
          <Button variant="solid" color="secondary" loading={loading} type="submit">{t('Save')}</Button>
          <Link to="/login" className="self-end">{t('Do you have an account?')}</Link>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
