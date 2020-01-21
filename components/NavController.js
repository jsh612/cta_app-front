import React from "react";
import { useIsLoggedIn } from "../AuthContext";
import { Text } from "react-native";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? <Text>로그인 했다.</Text> : <Text>로그아웃</Text>;
};
