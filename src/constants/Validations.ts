import * as yup from 'yup';

const requiredErrorMessage = 'This field is required';
const emailErrorMessage = 'Invalid email address';

export const contactFormValidationSchema = yup.object().shape({
  name: yup.string().required(requiredErrorMessage),
  email: yup.string().email(emailErrorMessage).required(requiredErrorMessage),
});

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email(emailErrorMessage).required(requiredErrorMessage),
  password: yup.string().required(requiredErrorMessage),
});
export const signUpValidationSchema = yup.object().shape({
  firstName: yup.string().required(requiredErrorMessage),
  lastName: yup.string().required(requiredErrorMessage),
  email: yup.string().email(emailErrorMessage).required(requiredErrorMessage),
  password: yup.string().required(requiredErrorMessage),
});
export const resetPasswordValidationSchema = yup.object().shape({
  email: yup.string().email(emailErrorMessage).required(requiredErrorMessage),
});
