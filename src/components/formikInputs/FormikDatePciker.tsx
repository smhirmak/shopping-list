// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
// import Object from '@/utilities/Object';
// import { FormikProps } from 'formik';
// import FormikErrorText from '@/components/formikInputs/FormikErrorText';
// import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
// import MethodHelper from '@/utilities/MethodHelper';
// import dayjs from 'dayjs';
// import DatePicker from '../DatePicker';

// interface IFormikDatePickerProps {
//   formik: FormikProps<any>;
//   id: string;
//   className?: string;
//   label: string;
//   placeholder?: string;
//   disabled?: boolean;
//   showRequiredIcon?: boolean;
//   maxDate?: Date;
//   minDate?: Date;
// }

// const FormikDatePicker: React.FC<IFormikDatePickerProps> = ({ formik, id, className, label, placeholder = '', disabled = false, showRequiredIcon = false, maxDate, minDate }) => {
//   const { t } = useLocalizeContext();
//   return (
//     <div className={className}>
//       <DatePicker
//         label={t(label)}
//         id={id}
//         onChange={(e: Date | null) => {
//           formik.setFieldValue(id, dayjs(e).format('YYYY-MM-DD'));
//         }}
//         maxDate={maxDate}
//         minDate={minDate}
//         value={Object.GetNestedValue(formik.values, id) ?? ''}
//         placeholder={t(placeholder)}
//         disabled={disabled}
//         error={Boolean(MethodHelper.formikErrorCheck(formik, id))}
//         showRequiredIcon={showRequiredIcon}
//       />
//       <FormikErrorText id={id} formik={formik} />
//     </div>
//   );
// };

// export default FormikDatePicker;
