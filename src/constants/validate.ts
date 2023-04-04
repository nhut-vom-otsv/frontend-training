import * as yup from "yup";

export const validationInformationSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9+]+$/, "Phone number must contain only numbers and +"),

  email: yup.string().required("Email is required").email("Invalid email"),
});

export const validationAddressSchema = yup.object().shape({
  number: yup
    .string()
    .required("Apartment number is required")
    .matches(/^[0-9a-zA-Z/]+$/, "Invalid apartment number"),

  ward: yup.string(),

  street: yup.string().required("Street is required"),

  city: yup.string().required("City is required"),

  country: yup.string().required("Country is required"),
});

export const validationPaymentSchema = yup.object().shape({
  owner: yup
    .string()
    .required("Card owner is required")
    .matches(/^[A-Z ]+$/, "Only capital letters are allowed for card owner"),

  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^[\d-]+$/, "Only numbers and dashes are allowed for card number")
    .length(16, "Card number must be 16 digits"),

  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3}$/, "CVC must be 3 digits"),
});
