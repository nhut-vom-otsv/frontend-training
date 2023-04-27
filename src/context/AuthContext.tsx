import { createContext, ReactElement, useCallback, useReducer } from "react";
import {
  removeLocalStorageValue,
  updateLocalStorageValue,
} from "../utils/LocalStorage";

type AuthStateType = {
  email?: string;
  accessToken?: string;
  refreshToken?: string;
};

const enum REDUCER_ACTION_TYPE {
  REMOVE_USER = "LOGOUT",
  UPDATE_USER = "UPDATE_USER",
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: AuthStateType;
};

const authReducer = (state: AuthStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.UPDATE_USER: {
      updateLocalStorageValue({
        key: "key",
        value: {
          email: action.payload?.email,
          accessToken: action.payload!.accessToken,
          refreshToken: action.payload?.refreshToken,
        },
      });

      return {
        ...state,
        email: action.payload?.email,
        accessToken: action.payload!.accessToken,
        refreshToken: action.payload?.refreshToken,
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE_USER: {
      removeLocalStorageValue({ key: "key" });
      return {};
    }

    default:
      return state;
  }
};

const useAuthContext = (initState: AuthStateType) => {
  const [authState, dispatch] = useReducer(authReducer, initState);

  const updateUserData = useCallback(
    (data: AuthStateType) =>
      dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_USER, payload: data }),
    [dispatch]
  );

  const removeUserData = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.REMOVE_USER }),
    [dispatch]
  );

  return { authState, updateUserData, removeUserData };
};

export type UseAuthContextType = ReturnType<typeof useAuthContext>;

const initContextState: UseAuthContextType = {
  authState: {},
  updateUserData: (data: AuthStateType) => {},
  removeUserData: () => {},
};

export const AuthContext = createContext<UseAuthContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const AuthProvider = ({
  children,
  ...initState
}: AuthStateType & ChildrenType): ReactElement => {
  return (
    <AuthContext.Provider value={useAuthContext(initState)}>
      {children}
    </AuthContext.Provider>
  );
};
