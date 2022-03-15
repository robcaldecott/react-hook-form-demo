import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import clsx from "clsx";

interface TWTextFieldProps extends ComponentPropsWithRef<"input"> {
  label?: ReactNode;
  error?: ReactNode;
}

export const TWTextField = forwardRef<HTMLInputElement, TWTextFieldProps>(
  ({ disabled, required, label, error, ...props }, ref) => (
    <label className="block w-full">
      {/* Label */}
      <span
        className={clsx(
          "block font-sans text-sm font-medium mb-1",
          disabled ? "text-slate-400" : "text-slate-900",
          required && "after:content-['*'] after:ml-0.5",
          required && {
            "after:text-sky-500": !disabled,
            "after:text-slate-400": disabled,
          }
        )}
      >
        {label}
      </span>

      {/* Input */}
      <input
        ref={ref}
        className="font-sans text-sm block w-full min-h-[40px] px-2 py-2 bg-white text-slate-900 border border-slate-300 hover:border-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none placeholder-slate-400 placeholder-shown:italic disabled:bg-slate-50 disabled:text-slate-400 disabled:hover:border-slate-300 disabled:shadow-none transition-colors shadow-sm rounded-md"
        disabled={disabled}
        {...props}
      />

      {/* Error */}
      {error && (
        <span className="mt-2 font-sans text-sm font-light text-red-700">
          {error}
        </span>
      )}
    </label>
  )
);
