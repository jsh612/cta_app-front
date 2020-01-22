import React from "react";
import { useIsLoggedIn } from "../AuthContext";
import { Text } from "react-native";
import AuthNavigation from "../navigation/AuthNavigation";
import Test from "../screens/Test";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? <Test /> : <AuthNavigation />;
};
