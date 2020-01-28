import React from "react";
import styled from "styled-components";
import { Text } from "react-native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <View>
      <Text>프로필 화면</Text>
    </View>
  );
};
