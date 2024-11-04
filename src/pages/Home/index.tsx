import Button from '@/components/Button';
import Container from '@/components/Container';
import FormikInput from '@/components/formikInputs/FormikInput';
import { db } from '@/configurations/firebase';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { collection, doc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import { Form, Formik, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Notification from '@/components/Notification';
import ShoppingListTable from './ShoppingListTable';

const Home = () => {
  const { userInfo, allUsersInfo } = useAuthContext();
  const { t } = useLocalizeContext();
  const [allShoppingList, setAllShoppingList] = useState<any[]>([]);
  const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      productQuantity: '',
      productCategory: '',
      productBrand: '',
      note: '',
      shoppingListName: '',
      dateToShop: '',
      quantityType: '',

    },
    onSubmit: async values => {
      setLoading(true);
      const editedValues = {
        createDateTime: Timestamp.now().toDate().toLocaleString(),
        creatorId: userInfo?.uid,
        dateToShop: values.dateToShop && new Date(values.dateToShop).toLocaleDateString(),
        shoppingListId: '',
        shoppingListName: values.shoppingListName,
        shoppingList: [{
          createDateTime: Timestamp.now().toDate().toLocaleString(),
          creatorId: userInfo?.uid,
          lastUpdateDateTime: Timestamp.now().toDate().toLocaleString(),
          lastUpdaterId: userInfo?.uid,
          note: values.note,
          productBrand: values.productBrand,
          productCategory: values.productCategory,
          productId: '1',
          productName: values.productName,
          productQuantity: values.productQuantity && +values.productQuantity,
          quantityType: values.quantityType,
        }],
      };
      console.log(editedValues);
      try {
        await setDoc(
          doc(db, 'shopping-list', '12asdfa123s234212234334df'),
          editedValues,
        );
        Notification.success('Shopping List added successfully');
        getAllShoppingList();
        setIsAddListDialogOpen(false);
      } catch (error) {
        Notification.error('Error setting document');
        console.error('Error setting document:', error);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  useEffect(() => {
    getAllShoppingList();
  }, []);

  // console.log(allShoppingList);

  return (
    <Container maxWidth="xl">

      <div className="flex justify-end">
        <Button variant="solid" onClick={() => setIsAddListDialogOpen(true)}>Add List</Button>
      </div>
      <ShoppingListTable rowData={allShoppingList} />
      {isAddListDialogOpen && (
        <Dialog open={isAddListDialogOpen} onOpenChange={() => setIsAddListDialogOpen(prev => !prev)}>
          <DialogContent className="max-h-[90vh] min-w-[50vw] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">Add New Shopping List</DialogTitle>
            </DialogHeader>
            {/* <DialogDescription> */}
            <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <Form>
                <FormikInput id="shoppingListName" formik={formik} label="Shopping List Name" type="text" />
                <FormikInput id="dateToShop" formik={formik} label="Date Time to Shop" type="date" />
                <FormikInput id="productName" formik={formik} label="Product Name" type="text" />
                <FormikInput id="productQuantity" formik={formik} label="Product Quantity" type="number" />
                <FormikInput id="quantityType" formik={formik} label="Quantity Type" type="text" />
                <FormikInput id="productCategory" formik={formik} label="Product Category" type="number" />
                <FormikInput id="productBrand" formik={formik} label="Product Brand" type="text" />
                <FormikInput id="note" formik={formik} label="Note" type="text" />
                <Button color="tetriary" loading={loading}>{t('Send')}</Button>
              </Form>
            </Formik>
            {/* </DialogDescription> */}

          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

export default Home;
