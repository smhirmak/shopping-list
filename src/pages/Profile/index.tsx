import Button from '@/components/Button';
import FormikInput from '@/components/formikInputs/FormikInput';
import Notification from '@/components/Notification';
import TextField from '@/components/TextField';
import { updateUserInfoValidationSchema } from '@/constants/Validations';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';
import { Copy } from '@/assets/Icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AddHomeDialog from './AddHomeDialog';

const Profile = () => {
  const { userInfo, editUser, getUserInfo } = useAuthContext();
  const { t } = useLocalizeContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = Notification();
  const [addHomeDialog, setAddHomeDialog] = useState<boolean>(false);

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
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-xl py-4">
      <Button className="mr-4 self-end" color="tetriary" type="button" onClick={() => setAddHomeDialog(true)}>{t('Create New Home')}</Button>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm} onReset={formik.handleReset}>
        <Form className="flex w-5/6 flex-col md:w-2/3">
          <FormikInput id="firstName" label="First Name" formik={formik} />
          <FormikInput id="lastName" label="Last Name" formik={formik} />
          <FormikInput
            id="includingHouse"
            label="Including House"
            inputClassName="truncate"
            formik={formik}
            endIcon={(
              <CopyToClipboard text={formik.values.includingHouse}>
                <Button
                  size="icon"
                  className="bg-transparent hover:bg-transparent"
                  type="button"
                  onClick={() => {
                    success('Copied to clipboard!');
                  }}
                >
                  <Copy className="size-6" />
                </Button>
              </CopyToClipboard>
            )}
          />
          <TextField label="Email" disabled value={userInfo?.email} />
          <Button className="mt-4 self-end" type="submit" color="tetriary" loading={loading}>{t('Save')}</Button>
        </Form>
      </Formik>
      {addHomeDialog && <AddHomeDialog addHomeDialog={addHomeDialog} setAddHomeDialog={setAddHomeDialog} />}
    </div>
  );
};

export default Profile;
