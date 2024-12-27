/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Object from '@/utilities/Object';
import MethodHelper from '@/utilities/MethodHelper';
import { ISelectOption } from '@/types/types';
import FormikErrorText from './FormikErrorText';
import Select from '../Select';

const FormikSelect:
React.FC<{
  isMulti?: boolean;
  isSearchable?: boolean;
  label: string;
  id: string;
  formik: any;
  tooltip?: string | string[];
  options: ISelectOption[];
  placeholder?: string,
  // borderRadius?: 'default' | 'lg';
  showRequiredIcon?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string; }> = ({ label, id, className, selectClassName, tooltip, labelClassName,
    disabled, placeholder = '', showRequiredIcon, formik, options, isMulti = false, isSearchable = false }) => (
      <div className={className}>
        <Select
          id={id}
          tooltip={tooltip}
          label={label}
          showRequiredIcon={showRequiredIcon}
          value={Object.GetNestedValue(formik.values, id) ?? ''}
          onChange={value => { if (!disabled) formik.setFieldValue(id, value); }}
          placeHolder={placeholder}
          options={options}
          isMulti={isMulti}
          isSearchable={isSearchable}
          error={Boolean(MethodHelper.formikErrorCheck(formik, id))}
          className={selectClassName}
          labelClassName={labelClassName}
          disabled={disabled}
        />
        <FormikErrorText id={id} formik={formik} />
      </div>
  );

export default FormikSelect;
