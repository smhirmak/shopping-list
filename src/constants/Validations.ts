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

export const newShoppingListValidationSchema = yup.object().shape({
  shoppingListName: yup.string().required(requiredErrorMessage),
  dateToShop: yup.string().required(requiredErrorMessage),
});
export const editShoppingListValidationSchema = yup.object().shape({
  shoppingListName: yup.string().required(requiredErrorMessage),
  dateToShop: yup.string().required(requiredErrorMessage),
});

export const newProductValidationSchema = yup.object().shape({
  productName: yup.string().required(requiredErrorMessage),
  productQuantity: yup.string().required(requiredErrorMessage),
  productCategory: yup.string().required(requiredErrorMessage),
  productBrand: yup.string(),
  note: yup.string(),
  quantityType: yup.string().required(requiredErrorMessage),
});

export const editProductValidationSchema = yup.object().shape({
  productName: yup.string().required(requiredErrorMessage),
  productQuantity: yup.string().required(requiredErrorMessage),
  quantityType: yup.string().required(requiredErrorMessage),
  productCategory: yup.string(),
  productBrand: yup.string(),
  note: yup.string(),
});

export const updateUserInfoValidationSchema = yup.object().shape({
  firstName: yup.string().required(requiredErrorMessage),
  lastName: yup.string().required(requiredErrorMessage),
});
export const updatePasswordValidationSchema = yup.object().shape({
  currentPassword: yup.string().required(requiredErrorMessage),
  newPassword: yup.string().required(requiredErrorMessage),
  newPasswordAgain: yup.string().required(requiredErrorMessage),
});

export const newShoppingListValidate = (values: any, addProduct: boolean) => {
  const errors: any = {};
  if (addProduct) {
    if (!values.productName) {
      errors.productName = requiredErrorMessage;
    }
    if (!values.productQuantity) {
      errors.productQuantity = requiredErrorMessage;
    }
    if (!values.productCategory) {
      errors.productCategory = requiredErrorMessage;
    }
    if (!values.productBrand) {
      errors.productBrand = requiredErrorMessage;
    }
  }
  return errors;
};
