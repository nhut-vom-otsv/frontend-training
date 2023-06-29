import * as yup from "yup";
import Payment from "payment";
import isMobilePhone from "validator/lib/isMobilePhone";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../context/FormContext";
import { LoginFormType } from "../pages/Login";
import { ChangePasswordFormType } from "../pages/ChangePassword";
import { EditProfileFormType } from "./data";
import { RegisterFormType } from "../pages/Register";

const passwordValidation = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be at most 64 characters");

const confirmPasswordValidation = (ref: string) => {
  return yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref(ref)], "Passwords must match");
};

const validateCardNumber = (value: string) => {
  return Payment.fns.validateCardNumber(value);
};

const validateCardExpiry = (value: string) => {
  return Payment.fns.validateCardExpiry(value);
};

const validateCardCvc = (value: string) => {
  return Payment.fns.validateCardCVC(value);
};

const validatePhoneNumber = (value: string) => {
  return isMobilePhone(value);
};

export type ConditionalSchema<T> = T extends string
  ? yup.StringSchema
  : T extends number
  ? yup.NumberSchema
  : T extends boolean
  ? yup.BooleanSchema
  : T extends Record<any, any>
  ? yup.AnyObjectSchema
  : T extends Array<any>
  ? yup.ArraySchema<any, any>
  : yup.AnySchema;

export type Shape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

export const validationInformationSchema = yup
  .object<Shape<InformationType>>()
  .shape({
    name: yup.string().required("Full name is required"),

    phoneNumber: yup
      .string()
      .required("Phone is required")
      .test(
        "valid-phone-number",
        "Invalid phone number format",
        validatePhoneNumber
      ),

    email: yup.string().required("Email is required").email("Invalid email"),
  });

export const validationAddressSchema = yup.object<Shape<AddressType>>().shape({
  address: yup.string().required("Address is required"),
});

export const validationPaymentSchema = yup.object<Shape<PaymentType>>().shape({
  cardOwner: yup
    .string()
    .required("Card name is required")
    .matches(/^[A-Z ]+$/, "Only capital letters are allowed for card name"),

  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(
      /^[\d\s-]+$/,
      "Only numbers, spaces, and dashes are allowed for card number"
    )
    .test(
      "valid-card-number",
      "Invalid card number format",
      validateCardNumber
    ),

  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3}$/, "CVC must be 3 digits")
    .test("valid-card-cvc", "Invalid card cvc format", validateCardCvc),

  expiry: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date format (MM/YY)")
    .test("valid-card-expiry", "Invalid expiry date", validateCardExpiry),
});

export const validationLoginSchema = yup.object<Shape<LoginFormType>>().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .min(6, "Email must be at least 6 characters")
    .max(64, "Email must be at most 64 characters"),
  password: passwordValidation,
});

export const validationRegisterSchema = yup
  .object<Shape<RegisterFormType>>()
  .shape({
    name: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required")
      .min(6, "Email must be at least 6 characters")
      .max(64, "Email must be at most 64 characters"),
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation("password"),
  });

export const validationEditProfileSchema = yup
  .object<Shape<EditProfileFormType>>()
  .shape({
    name: yup.string(),
    phoneNumber: yup
      .string()
      .test(
        "phoneNumber",
        "Phone number must contain only numbers and +",
        (value) => {
          if (value && value.length > 0) {
            return /^[0-9+]+$/.test(value);
          }
          return true;
        }
      ),
  });

export const validationUpdatePasswordSchema = yup
  .object<Shape<ChangePasswordFormType>>()
  .shape({
    newPassword: passwordValidation,
    confirmPassword: confirmPasswordValidation("newPassword"),
  });

export const validationChangePasswordSchema = yup
  .object<Shape<ChangePasswordFormType>>()
  .shape({
    oldPassword: passwordValidation,
    newPassword: passwordValidation,
    confirmPassword: confirmPasswordValidation("newPassword"),
  });

export const combinedInformationAndAddressSchema = yup
  .object()
  .concat(validationInformationSchema)
  .concat(validationAddressSchema);
