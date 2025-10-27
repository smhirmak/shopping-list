import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import { loginValidationSchema } from '@/constants/Validations';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Fish } from '@/assets/Icons';
import useAuthStore from '@/stores/authStore';
import Notification from '@/components/Notification';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLocalizeContext();
  const login = useAuthStore(state => state.login);
  const { success, error } = Notification();

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

      const result = await login(values);

      setLoading(false);

      if (result.status === 'success') {
        success('Oturum açma başarılı!');
        navigate('/');
      } else if (result.status === 'verification-sent') {
        success('Email doğrulama e-postası gönderildi. Lütfen mail adresinizi doğrulayın.');
      } else if (result.status === 'error') {
        error(t(result.code?.split('/').pop()));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 self-center rounded-xl border-2 border-tra-neutral-grey py-8 md:w-2/5">
      <p className="text-4xl font-semibold">{t('Login')}</p>
      <form onSubmit={e => { e.preventDefault(); formik.handleSubmit(); }} className="flex w-5/6 flex-col md:w-2/3">
        <FormikInput id="email" formik={formik} label="Email" type="email" />
        <FormikInput id="password" formik={formik} label="Password" type="password" />
        <Link to="/reset-password" className="mb-4 flex gap-2 self-end">
          Şifremi Unuttum
          <Fish className="size-6" />
        </Link>
        <Button variant="solid" color="secondary" loading={loading} type="submit">Gönder</Button>
        <Link to="/sign-up" className="mt-2 self-end">Hesabınız yok mu?</Link>
      </form>
    </div>
  );
};

export default Login;
