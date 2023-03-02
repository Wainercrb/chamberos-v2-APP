import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationProp, StackActions } from "@react-navigation/native";
import { RootState } from "../store";
import { type TRootStackParamList } from "../../types";

interface IProps {
  navigation: NavigationProp<TRootStackParamList>;
  Component: () => JSX.Element;
  allowedRoles: string[];
  redirectTo: keyof TRootStackParamList;
}

const ProtectedScreen: FC<IProps> = ({
  Component,
  navigation,
  allowedRoles,
  redirectTo,
}) => {
  const { user } = useSelector(({ userSession }: RootState) => userSession);

  const userHasAccess = () => {
    const authorities = Array.isArray(user.authorities) ? user.authorities : [];
    const flatRoles = authorities.flatMap(({ authority }) => authority);
    return allowedRoles.every((role) => flatRoles.includes(role));
  };

  useEffect(() => {
    if (!userHasAccess()) {
      navigation.dispatch(StackActions.replace(redirectTo));
    }
  }, [user]);

  return <Component />;
};

export default ProtectedScreen;
