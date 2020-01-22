import React, { useEffect } from "react";
import { useMeChecker } from "../AuthContext";
import styled from "styled-components";
import { Text } from "react-native";

const View = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const isMe = useMeChecker();
  const meData = isMe();
  return (
    <View>
      <Text>
        {meData && meData.data ? meData.data.me.username : null} 로그인됨
      </Text>
    </View>
  );
};
