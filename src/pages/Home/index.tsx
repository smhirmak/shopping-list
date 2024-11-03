import Button from '@/components/Button';
import Container from '@/components/Container';
import { auth } from '@/configurations/firebase';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const { userInfo } = useAuthContext();

  return (
    <Container maxWidth="xl">
      Shopping List App
    </Container>
  );
};

export default Home;
