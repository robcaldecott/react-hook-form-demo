import { useMemo } from "react";
import {
  Paper,
  Stack,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  Typography,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, useController, UseControllerProps } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { FormattedMessage, useIntl } from "react-intl";
import { formSchema } from "./formSchema";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const TextField = ({
  type,
  label,
  inputProps,
  required,
  ...props
}: MuiTextFieldProps & UseControllerProps<FormData>) => {
  const {
    field,
    fieldState,
    formState: { isValid, isSubmitting },
  } = useController(props);

  return (
    <MuiTextField
      {...field}
      type={type}
      label={label}
      inputProps={inputProps}
      InputLabelProps={{ required }}
      fullWidth
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      disabled={isValid && isSubmitting}
    />
  );
};

export const MuiControllerHook = () => {
  const intl = useIntl();
  const schema = useMemo(() => formSchema(intl), [intl]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", phone: "" },
    resolver: nopeResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  });

  return (
    <Paper
      sx={{
        padding: 2,
        position: "relative",
        overflow: "hidden",
        borderRadius: "1rem",
      }}
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h6">
            <FormattedMessage defaultMessage="TextField + useController" />
          </Typography>

          {/* Name */}
          <TextField
            name="name"
            control={control}
            type="text"
            required
            label={<FormattedMessage defaultMessage="Name" />}
            inputProps={{ autoComplete: "name", spellCheck: "false" }}
          />

          {/* Email */}
          <TextField
            name="email"
            control={control}
            type="text"
            required
            label={<FormattedMessage defaultMessage="Email address" />}
            inputProps={{
              inputMode: "email",
              autoComplete: "email",
              spellCheck: "false",
            }}
          />

          {/* Phone number */}
          <TextField
            name="phone"
            control={control}
            type="tel"
            label={<FormattedMessage defaultMessage="Phone number" />}
            inputProps={{ autoComplete: "tel" }}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            sx={{ width: "100%" }}
          >
            <Button onClick={() => reset()} disabled={isValid && isSubmitting}>
              <FormattedMessage defaultMessage="Reset" />
            </Button>

            <LoadingButton
              variant="contained"
              type="submit"
              loading={isSubmitting && isValid}
              disableElevation
            >
              <FormattedMessage defaultMessage="Submit" />
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};
