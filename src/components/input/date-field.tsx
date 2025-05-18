"use client";
import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

const DateField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    errorChild?: React.ReactNode;
  }
>(({ label, errorChild, ...props }, ref) => {
  return (
    <fieldset className="fieldset">
      {label && <legend className="fieldset-legend">{label}</legend>}
      <input
        ref={ref}
        placeholder={label}
        {...props}
        className={clsx("input validator w-full", props.className)}
        type="date"
      />

      {errorChild && (
        <div className="validator-hint text-red-500">{errorChild}</div>
      )}
    </fieldset>
  );
});
DateField.displayName = DateField.name;
export { DateField };
