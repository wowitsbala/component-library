import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { checkboxIndicatorStyles, checkboxStyles } from "./CheckBox.config";
import { useCheckboxGroup } from "./CheckboxGroup";
import Tooltip from "./Tooltip";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="ubmisg-h-full ubmisg-w-full ubmisg-text-white"
  >
    <path
      fillRule="evenodd"
      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.35 2.35 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
      clipRule="evenodd"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="ubmisg-h-full ubmisg-w-full ubmisg-text-white"
  >
    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
  </svg>
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: string | React.ReactNode | null;
  indeterminate?: boolean;
  size?: "small" | "medium" | "large";
  status?: "default" | "error" | "warning" | "success";
  tooltip?: string | React.ReactNode | null;
  visuallyHiddenLabel?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((initialProps, ref) => {
  const group = useCheckboxGroup();

  const {
    checked: controlledChecked,
    defaultChecked,
    className,
    label,
    indeterminate = false,
    id,
    tooltip,
    style,
    value: optionValue,
    visuallyHiddenLabel,
    onChange: onCheckboxChange,
    size: inputSize,
    status: inputStatus,
    disabled: inputDisabled,
    readOnly: inputReadOnly,
    ...restInputProps
  } = initialProps;
  const size = group?.size ?? inputSize ?? "medium";
  const status = group?.status ?? inputStatus ?? "default";
  const disabled = group?.disabled ?? inputDisabled ?? false;
  const readOnly = group?.readOnly ?? inputReadOnly ?? false;

  const internalRef = useRef<HTMLInputElement>(null);
  const finalRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const uniqueId = id || React.useId();
  const isGroupControlled = group?.value !== undefined;
  const isStandaloneControlled = controlledChecked !== undefined;
  const isControlled = isGroupControlled || isStandaloneControlled;

  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  const isEffectivelyChecked = isControlled
    ? group
      ? group.value.includes(String(optionValue ?? ""))
      : controlledChecked
    : internalChecked;

  useEffect(() => {
    if (finalRef.current) {
      finalRef.current.indeterminate = indeterminate;
    }
  }, [finalRef, indeterminate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (readOnly || disabled) return;

    const checked = event.target.checked;

    if (group) {
      group.onChange(String(optionValue ?? ""), checked);
    } else {
      if (!isControlled) {
        setInternalChecked(checked);
      }
      onCheckboxChange?.(checked, event);
    }
  };

  const labelClasses = [
    checkboxStyles.base,
    checkboxStyles.variants.size[size],
    disabled && checkboxStyles.variants.disabled.true,
    readOnly && checkboxStyles.variants.readOnly.true,
    className
  ]
    .filter(Boolean)
    .join(" ");

  const indicatorBaseClasses = checkboxIndicatorStyles.base;
  const indicatorSizeClasses = checkboxIndicatorStyles.variants.size[size];
  const indicatorStatusClasses =
    indeterminate || isEffectivelyChecked
      ? checkboxIndicatorStyles.variants.status[status].checked
      : checkboxIndicatorStyles.variants.status[status].unchecked;

  const indicatorClasses = [
    indicatorBaseClasses,
    indicatorSizeClasses,
    indicatorStatusClasses
  ].join(" ");

  const component = (
    <label htmlFor={uniqueId} style={style} className={labelClasses}>
      <input
        type="checkbox"
        id={uniqueId}
        ref={finalRef}
        value={optionValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        checked={!!isEffectivelyChecked}
        aria-checked={indeterminate ? "mixed" : !!isEffectivelyChecked}
        className="ubmisg-sr-only"
        {...restInputProps}
      />
      <span className={indicatorClasses}>
        {isEffectivelyChecked && !indeterminate && <CheckIcon />}
        {indeterminate && <IndeterminateIcon />}
      </span>
      {label && <span className={visuallyHiddenLabel ? "ubmisg-sr-only" : ""}>{label}</span>}
    </label>
  );
  if (tooltip) {
    return <Tooltip content={tooltip}>{component}</Tooltip>;
  }

  return component;
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
