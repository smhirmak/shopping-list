import Button from '@/components/Button';
import Container from '@/components/Container';
import FormikInput from '@/components/formikInputs/FormikInput';
import { auth, db } from '@/configurations/firebase';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { Form, Formik, useFormik } from 'formik';
import { useEffect, useState } from 'react';

const Home = () => {
  const { userInfo, allUsersInfo } = useAuthContext();
  const [allShoppingList, setAllShoppingList] = useState<any[]>([]);
  const { t } = useLocalizeContext();

  const getAllShoppingList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'shopping-list'));
      // querySnapshot.forEach(doc => { // her veriyi tek tek almak için
      //   console.log(doc.id, " => ", doc.data());
      // });
      const documentsArray: any[] = []; // tüm verileri bir array içine almak için
      querySnapshot.forEach(document => {
        documentsArray.push(document.data());
      });
      setAllShoppingList(documentsArray);
    } catch (error) {
      console.error('Error setting document:', error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    // validationSchema: loginValidationSchema,
    initialValues: {
      productName: '',
      productQuantity: 0,
      productCategory: '',
      productBrand: '',
      note: '',
    },
    onSubmit: async values => {
      const editedValues = {
        createDateTime: Timestamp.now().toDate().toLocaleString(),
        creatorId: userInfo?.uid,
        shoppingList: {
          ...values,
          productQuantity: +values.productQuantity,
          lastUpdateDateTime: Timestamp.now().toDate().toLocaleString(),
          lastUpdaterId: userInfo?.uid
        },
      };
      console.log(editedValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  useEffect(() => {
    getAllShoppingList();
  }, []);

  console.log(allShoppingList);

  return (
    <Container maxWidth="xl">
      Shopping List App
      <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Form>
          <FormikInput id="productName" formik={formik} label="Product Name" type="text" />
          <FormikInput id="productQuantity" formik={formik} label="Product Quantity" type="number" />
          <FormikInput id="productCategory" formik={formik} label="Product Category" type="number" />
          <FormikInput id="productBrand" formik={formik} label="Product Brand" type="number" />
          <FormikInput id="note" formik={formik} label="Note" type="number" />
          <Button color="tetriary">{t('Send')}</Button>
        </Form>
      </Formik>
      <div>
        {allShoppingList.map(e => (
          <div key={e?.shoppingListId}>
            <p>
              List Name:
              {' '}
              {e?.shoppingListName}
            </p>
            <p>
              ID:
              {' '}
              {e?.shoppingListId}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
