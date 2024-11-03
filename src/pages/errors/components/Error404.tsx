import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Error404 = () => {
  const { t } = useLocalizeContext();
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4">
        <p className="text-[300px] font-bold text-white opacity-30">404</p>
      </div>
      <h1 className="mb-4 text-7xl font-bold text-white">{t('Page Not Found!')}</h1>
      <div className="mb-7 text-3xl font-medium text-white">{t('The page you are looking for cannot be reached.')}</div>
      <div className="mb-3" />
      <div className="mb-0">
        <Link to="/">
          <Button onClick={() => {}} variant="contained">
            {t('Back to Home Page')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Error404;
