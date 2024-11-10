import React, { useRef } from 'react';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import Object from '@/utilities/Object';
import Label from '../Label';
import FormikErrorText from './FormikErrorText';
import SelectBox from '../SelectBox';

const FormikSelect: React.FC<{ defaultValue?: string | number; label: string; id: string; formik: any; optionsList: { value: string, content: string }[] }> = ({ defaultValue, label, id, className, selectClassName, tooltip, startIcon, disabled, placeholder, borderRadius, showRequiredIcon, formik, optionsList }) => {
  const { t } = useLocalizeContext();
  const labelRef = useRef<HTMLLabelElement>(null);
  return (
    <div className={className}>
      <Label
        ref={labelRef}
        className="mb-1 transition-all duration-150 ease-cubic"
        // className={`
        //   ${cn(labelStyles({ variant, borderRadius }))}
        //   ${(inputFocused || !!value) ? '-top-[2px] bg-transparent' : ''}
        //   ${labelClassName}`}
        htmlFor={id}
        id={`${id}-label`}
        tooltip={tooltip}
        startIcon={startIcon}
        disabled={disabled}
        borderRadius={borderRadius}
        showRequiredIcon={showRequiredIcon}
      >
        {t(label)}
      </Label>
      <SelectBox
        id={id}
        value={Object.GetNestedValue(formik.values, id) ?? ''}
        onChange={value => formik.setFieldValue(id, value)}
        placeholder={placeholder}
        optionsList={optionsList}
        translateFunction={t}
      />
      <FormikErrorText id={id} formik={formik} />
    </div>
  );
};

export default FormikSelect;
