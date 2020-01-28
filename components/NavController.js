import React from "react";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
import Test from "../screens/Test";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />;
  // return isLoggedIn ? <Test /> : <AuthNavigation />;
};
