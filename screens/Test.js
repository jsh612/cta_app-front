import React from "react";
import { meChecker } from "../AuthContext";
import styled from "styled-components";
import { Text } from "react-native";

const View = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const checker = meChecker();
  const info = checker();
  return (
    <View>
      <Text>user {info.data.me.username} 로그인됨</Text>
    </View>
  );
};
