import { IntlShape } from "react-intl";
import * as Nope from "nope-validator";

export const formSchema = (intl: IntlShape) =>
  Nope.object().shape({
    name: Nope.string().required(
      intl.formatMessage({ defaultMessage: "Please enter a name" })
    ),
    email: Nope.string()
      .email(
        intl.formatMessage({
          defaultMessage: "Please enter a valid email address",
        })
      )
      .required(
        intl.formatMessage({
          defaultMessage: "Please enter an email address",
        })
      ),
    phone: Nope.string().regex(
      /^([0-9 ()+-]){1,20}$/,
      intl.formatMessage({
        defaultMessage: "Please enter a valid phone number",
      })
    ),
  });
