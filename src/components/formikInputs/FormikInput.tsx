import TextField from '@/components/TextField';
import FormikErrorText from '@/components/formikInputs/FormikErrorText';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import MethodHelper from '@/utilities/MethodHelper';
import Object from '@/utilities/Object';

interface IFormikInput {
  id: string;
  formik: any;
  label: string;
  disabled?: boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  tooltip?: string;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'filled' | 'outlined' | 'underlined';
  className?: string;
  endIcon?: React.ReactNode;
  inputClassName?: string;
  readOnly?: boolean;
}

const FormikInput: React.FC<IFormikInput> = ({ id, formik, inputClassName, readOnly,
  variant, size, label, disabled = false, type = 'text', placeholder = '', tooltip, className, endIcon, ...otherProps }) => {
  const { t } = useLocalizeContext();
  return (
    <div className={`flex flex-col ${className}`}>
      <TextField
        id={id}
        variant={variant}
        label={label}
        inputClassName={inputClassName}
        size={size}
        error={Boolean(MethodHelper.formikErrorCheck(formik, id))}
        value={Object.GetNestedValue(formik.values, id) ?? ''}
        onWheel={event => (event.target as HTMLInputElement).blur()}
        onChange={e => {
          formik.setFieldValue(id, e.target.value);
        }}
        disabled={disabled}
        type={type}
        placeholder={t(placeholder)}
        endIcon={endIcon}
        readOnly={readOnly}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
      <FormikErrorText id={id} formik={formik} />
    </div>
  );
};

export default FormikInput;
