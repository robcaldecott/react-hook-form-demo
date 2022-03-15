import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { TWTextField } from "./TWTextField";
import { TWButton } from "./TWButton";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export const Tailwind = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<FormData>({ mode: "onTouched" });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl shadow-md overflow-hidden p-4"
    >
      {/* Vertical stack */}
      <div className="flex flex-col space-y-4">
        {/* Title */}
        <h1 className="font-sans text-slate-900 text-xl font-medium">
          <FormattedMessage defaultMessage="Tailwind + register" />
        </h1>

        {/* Name */}
        <TWTextField
          label={<FormattedMessage defaultMessage="Name" />}
          required
          autoComplete="name"
          spellCheck="false"
          error={
            errors.name && (
              <FormattedMessage defaultMessage="Please enter a name" />
            )
          }
          disabled={isSubmitting && isValid}
          {...register("name", { required: true })}
        />

        {/* Email */}
        <TWTextField
          label={<FormattedMessage defaultMessage="Email" />}
          required
          inputMode="email"
          autoComplete="email"
          spellCheck="false"
          error={
            errors.email?.type === "required" ? (
              <FormattedMessage defaultMessage="Please enter an email address" />
            ) : errors.email?.type === "pattern" ? (
              <FormattedMessage defaultMessage="Please enter a valid email address" />
            ) : undefined
          }
          disabled={isSubmitting && isValid}
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
          })}
        />

        {/* Phone number */}
        <TWTextField
          type="tel"
          label={<FormattedMessage defaultMessage="Phone number" />}
          autoComplete="tel"
          spellCheck="false"
          error={
            errors.phone && (
              <FormattedMessage defaultMessage="Please enter a valid phone number" />
            )
          }
          disabled={isSubmitting && isValid}
          {...register("phone", { pattern: /^([0-9 ()+-]){1,20}$/ })}
        />

        {/* Buttons */}
        <div className="flex justify-end w-full space-x-2">
          {/* Reset form */}
          <TWButton
            type="button"
            variant="secondary"
            onClick={() => reset()}
            disabled={isValid && isSubmitting}
          >
            <FormattedMessage defaultMessage="Reset" />
          </TWButton>

          {/* Submit form */}
          <TWButton
            variant="primary"
            type="submit"
            disabled={isValid && isSubmitting}
          >
            <FormattedMessage defaultMessage="Submit" />
          </TWButton>
        </div>
      </div>
    </form>
  );
};
