import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

interface Props {
  name: string;
  type?: string;
  as?: string;
  label?: string;
  description?: string;
  value?: string;
  error?: boolean | string;
  control: string;
  showIcon?: boolean;
  rows?: number;
  maxLength?: number;
  onChange?: (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  className?: string;
  options?: { key: string; value: string }[];
}

const FormControl: React.FC<Props> = ({
  name,
  type,
  as,
  label,
  description,
  value,
  error,
  control,
  showIcon,
  rows,
  maxLength,
  onChange,
  className,
  options,
}) => {
  switch (control) {
    case 'input':
      return (
        <FormInput
          name={name}
          error={error}
          label={label}
          type={type}
          description={description}
          value={value}
          showIcon={showIcon}
          as={as}
          rows={rows}
          onChange={onChange}
          maxLength={maxLength}
          className={className}
        />
      );
    case 'select':
      return (
        <FormSelect
          name={name}
          error={error}
          label={label}
          options={options}
          description={description}
        />
      );
    default:
      return null;
  }
};

export default FormControl;
