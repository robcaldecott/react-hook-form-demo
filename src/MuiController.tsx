import { useMemo } from "react";
import { Paper, Stack, TextField, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { FormattedMessage, useIntl } from "react-intl";
import { formSchema } from "./formSchema";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export const MuiController = () => {
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
            <FormattedMessage defaultMessage="TextField + Controller" />
          </Typography>

          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({
              field,
              fieldState,
              formState: { isValid, isSubmitting },
            }) => (
              <TextField
                type="text"
                fullWidth
                label={<FormattedMessage defaultMessage="Name" />}
                inputProps={{ autoComplete: "name", spellCheck: "false" }}
                InputLabelProps={{ required: true }}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                disabled={isValid && isSubmitting}
                {...field}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({
              field,
              fieldState,
              formState: { isValid, isSubmitting },
            }) => (
              <TextField
                type="text"
                fullWidth
                label={<FormattedMessage defaultMessage="Email address" />}
                inputProps={{
                  inputMode: "email",
                  autoComplete: "email",
                  spellCheck: "false",
                }}
                InputLabelProps={{ required: true }}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                disabled={isValid && isSubmitting}
                {...field}
              />
            )}
          />

          {/* Phone number */}
          <Controller
            name="phone"
            control={control}
            render={({
              field,
              fieldState,
              formState: { isValid, isSubmitting },
            }) => (
              <TextField
                type="tel"
                fullWidth
                label={<FormattedMessage defaultMessage="Phone number" />}
                inputProps={{ autoComplete: "tel" }}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                disabled={isValid && isSubmitting}
                {...field}
              />
            )}
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
