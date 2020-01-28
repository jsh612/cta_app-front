import React from "react";
import styled from "styled-components";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView, SectionList } from "react-navigation";
import constants from "../../constants";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.View`
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${constants.height / 2.3};
  width: ${constants.width / 1.3};
  border: solid 2px black;
`;

const Header = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 5px;
`;

export default () => {
  return (
    <Container>
      <Column>
        <Header>
          <Text>수험 정보</Text>
        </Header>
        <Text>하이</Text>
        <Text>하이</Text>
        <Text>하이</Text>
        <Text>하이</Text>
      </Column>
      <Column>
        <Header>
          <Text>학습 정보</Text>
        </Header>
        <Text>하이</Text>
        <Text>하이</Text>
        <Text>하이</Text>
        <Text>하이</Text>
      </Column>
    </Container>
  );
};
