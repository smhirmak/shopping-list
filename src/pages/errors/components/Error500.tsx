import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Error500 = () => {
  const { t } = useLocalizeContext();
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4">
        <p className="text-[300px] font-bold text-white opacity-30">500</p>
      </div>
      <h1 className="fw-bolder fs-2qx mb-4 text-gray-900">{t('System Error')}</h1>
      <div className="fw-semibold fs-6 mb-7 text-gray-500">
        S
        {t('Something went wrong! Please try again later.')}
      </div>
      <div className="mb-11" />
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
export default Error500;
