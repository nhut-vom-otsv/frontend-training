import { createContext, ReactElement, useCallback, useReducer } from "react";
import AddressForm from "../components/CheckoutForm/AddressForm";
import ConfirmForm from "../components/CheckoutForm/ConfirmForm";
import InformationForm from "../components/CheckoutForm/InformationForm";
import PaymentForm from "../components/CheckoutForm/PaymentForm";

export type InformationType = {
  name: string;
  email: string;
  phoneNumber: string;
};

export type AddressType = {
  address: string;
  lat?: number;
  lng?: number;
};

export type PaymentType = {
  cardNumber: string;
  cardOwner: string;
  cvc: string;
  expiry: string;
};

export type FormStateType = {
  information: InformationType;
  address: AddressType;
  payment: PaymentType;
  step: number;
  forms: React.ElementType[];
};

export const defaultForm: FormStateType = {
  information: {
    name: "",
    email: "",
    phoneNumber: "",
  },
  address: {
    address: "",
  },
  payment: {
    cardNumber: "",
    cardOwner: "",
    cvc: "",
    expiry: "",
  },
  forms: [InformationForm, AddressForm, PaymentForm, ConfirmForm],
  step: 0,
};

const enum REDUCER_ACTION_TYPE {
  SET_INFORMATION,
  SET_ADDRESS,
  SET_PAYMENT,
  RESET_FORM,
  NEXT_STEP,
  PREVIOUS_STEP,
}

type ReducerAction =
  | {
      type: REDUCER_ACTION_TYPE.SET_PAYMENT;
      payload: { formData: PaymentType };
    }
  | {
      type: REDUCER_ACTION_TYPE.SET_ADDRESS;
      payload: { formData: AddressType };
    }
  | {
      type: REDUCER_ACTION_TYPE.SET_INFORMATION;
      payload: { formData: InformationType };
    }
  | {
      type: REDUCER_ACTION_TYPE.RESET_FORM;
    }
  | {
      type: REDUCER_ACTION_TYPE.NEXT_STEP;
    }
  | {
      type: REDUCER_ACTION_TYPE.PREVIOUS_STEP;
    };

const formReducer = (state: FormStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_INFORMATION:
      return { ...state, information: action.payload.formData };

    case REDUCER_ACTION_TYPE.SET_ADDRESS:
      return { ...state, address: action.payload.formData };

    case REDUCER_ACTION_TYPE.SET_PAYMENT:
      return { ...state, payment: action.payload.formData };

    case REDUCER_ACTION_TYPE.RESET_FORM:
      return defaultForm;

    case REDUCER_ACTION_TYPE.NEXT_STEP:
      return { ...state, step: state.step + 1 };

    case REDUCER_ACTION_TYPE.PREVIOUS_STEP:
      return { ...state, step: state.step - 1 };

    default:
      return state;
  }
};

const useFormContext = (initState: FormStateType) => {
  const [formState, dispatch] = useReducer(formReducer, initState);

  const setInformation = useCallback(
    (formData: InformationType) => {
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_INFORMATION,
        payload: { formData },
      });
    },
    [dispatch]
  );

  const setAddress = useCallback(
    (formData: AddressType) => {
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_ADDRESS,
        payload: { formData },
      });
    },
    [dispatch]
  );

  const setPayment = useCallback(
    (formData: PaymentType) => {
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_PAYMENT,
        payload: { formData },
      });
    },
    [dispatch]
  );

  const resetForm = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.RESET_FORM,
    });
  }, [dispatch]);

  const moveNextStep = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEXT_STEP,
    });
  }, [dispatch]);

  const movePreviousStep = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.PREVIOUS_STEP,
    });
  }, [dispatch]);

  return {
    formState,
    setAddress,
    setInformation,
    setPayment,
    resetForm,
    moveNextStep,
    movePreviousStep,
  };
};

export type UseFormContextType = ReturnType<typeof useFormContext>;

const initContextState: UseFormContextType = {
  formState: defaultForm,
  setInformation: (formData: InformationType) => {},
  setAddress: (formData: AddressType) => {},
  setPayment: (formData: PaymentType) => {},
  resetForm: () => {},
  moveNextStep: () => {},
  movePreviousStep: () => {},
};

export const FormContext = createContext<UseFormContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const FormProvider = ({
  children,
  ...initState
}: FormStateType & ChildrenType): ReactElement => {
  return (
    <FormContext.Provider value={useFormContext(initState)}>
      {children}
    </FormContext.Provider>
  );
};
