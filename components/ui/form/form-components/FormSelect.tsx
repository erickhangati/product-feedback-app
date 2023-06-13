import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';
import ArrowDown from '../../icons/ArrowDown';
import styles from './FormSelect.module.scss';

interface Props {
  name: string;
  label?: string;
  description?: string;
  value?: string;
  error?: boolean | string;
  className?: string;
  options?: { key: string; value: string }[];
}

const FormSelect: React.FC<Props> = ({
  name,
  label,
  description,
  value,
  error,
  className,
  options,
}) => {
  const [field, meta] = useField(name);

  return (
    <div
      className={`${styles['form-input']}${className ? ` ${className}` : ''}`}
    >
      <div className={styles['form-labels']}>
        <div className={styles['form-labels__text']}>
          {label && <label htmlFor={name}>{label}</label>}
          {description && <p>{description}</p>}
        </div>
        <ErrorMessage name={name} component='span' />
      </div>
      <div className={styles['input-field']}>
        <Field
          as='select'
          id={name}
          name={name}
          className={error ? styles['border-error'] : ''}
          value={field.value}
          onChange={field.onChange}
        >
          {options?.map((option) => (
            <option key={Math.random()} value={option.value}>
              {option.key}
            </option>
          ))}
        </Field>
        <ArrowDown className={styles['form-input__icon']} />
      </div>
    </div>
  );
};

export default FormSelect;
