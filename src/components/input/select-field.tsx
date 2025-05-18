"use client";
import clsx from "clsx";
import { forwardRef, SelectHTMLAttributes } from "react";

const SelectField = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    errorChild?: React.ReactNode;
    items: Array<{ label: string; value: string }>;
  }
>(({ label, errorChild, items, ...props }, ref) => {
  return (
    <fieldset className="fieldset">
      {label && <legend className="fieldset-legend">{label}</legend>}
      <select
        ref={ref}
        {...props}
        defaultValue={props.defaultValue ?? label}
        className={clsx("select validator w-full", props.className)}
      >
        <option disabled value={""}>
          {label}
        </option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errorChild && <div className="validator-hint">{errorChild}</div>}
    </fieldset>
  );
});
SelectField.displayName = SelectField.name;
export { SelectField };
