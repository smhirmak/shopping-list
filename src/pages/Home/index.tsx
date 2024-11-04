import Button from '@/components/Button';
import Container from '@/components/Container';
import { auth, db } from '@/configurations/firebase';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const Home = () => {
  const { userInfo } = useAuthContext();
  const [allShoppingList, setAllShoppingList] = useState<any[]>([]);

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

  useEffect(() => {
    getAllShoppingList();
  }, []);

  console.log(allShoppingList);

  return (
    <Container maxWidth="xl">
      Shopping List App
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
