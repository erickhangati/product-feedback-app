import React, { useState } from 'react';
import { Field, ErrorMessage, useField } from 'formik';
import Eye from '../../icons/Eye';
import CrossedEye from '../../icons/CrossedEye';
import styles from './FormInput.module.scss';

interface Props {
  name: string;
  type?: string;
  as?: string;
  label?: string;
  description?: string;
  value?: string;
  error?: boolean | string;
  showIcon?: boolean;
  maxLength?: number;
  rows?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  className?: string;
}

const FormInput: React.FC<Props> = ({
  name,
  label,
  description,
  value,
  error,
  type,
  as,
  showIcon,
  maxLength,
  rows,
  onChange,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name);

  const togglePasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

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
          id={name}
          name={name}
          type={showIcon ? (showPassword ? 'text' : 'password') : type}
          className={error ? styles['border-error'] : ''}
          as={as}
          maxLength={maxLength}
          rows={rows}
          onChange={onChange}
          value={field.value}
        />
        {showIcon && !showPassword && <Eye onClick={togglePasswordHandler} />}
        {showIcon && showPassword && (
          <CrossedEye onClick={togglePasswordHandler} />
        )}
      </div>
    </div>
  );
};

export default FormInput;
