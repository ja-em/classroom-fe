"use client";
import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

const InputField = forwardRef<
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
      />

      {errorChild && (
        <div className="validator-hint text-red-500">{errorChild}</div>
      )}
    </fieldset>
  );
});
InputField.displayName = InputField.name;
export { InputField };
