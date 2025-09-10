import React, { createContext, useContext } from "react";

import type { CheckboxProps } from "./CheckBox";

interface CheckboxGroupContextType {
  value: string[];
  onChange: (optionValue: string, checked: boolean) => void;
  size?: CheckboxProps["size"];
  status?: CheckboxProps["status"];
  disabled?: boolean;
  readOnly?: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useCheckboxGroup = () => useContext(CheckboxGroupContext);

export interface CheckboxGroupProps {
  children: React.ReactNode;
  label?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  size?: CheckboxProps["size"];
  status?: CheckboxProps["status"];
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

export const CheckboxGroup = ({
  children,
  label,
  value: controlledValue,
  defaultValue = [],
  onChange,
  size,
  status,
  disabled,
  readOnly,
  className
}: CheckboxGroupProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleGroupChange = (optionValue: string, checked: boolean) => {
    const newValue = checked ? [...value, optionValue] : value.filter(v => v !== optionValue);

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const contextValue: CheckboxGroupContextType = {
    value,
    onChange: handleGroupChange,
    size,
    status,
    disabled,
    readOnly
  };

  return (
    <fieldset className={className} role="group">
      {label && <legend className="ubmisg-mb-2 ubmisg-font-medium">{label}</legend>}
      <div className="ubmisg-flex ubmisg-flex-col ubmisg-gap-2">
        <CheckboxGroupContext.Provider value={contextValue}>
          {children}
        </CheckboxGroupContext.Provider>
      </div>
    </fieldset>
  );
};
