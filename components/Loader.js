import React from "react";
import { Text, ImageBackground, Image } from "react-native";
import styled from "styled-components";
import constants from "../constants";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.Image`
  height: ${constants.height / 5}px;
  width: ${constants.width / 1}px;
`;

export default () => {
  return (
    <Container>
      <LogoImg source={require("../assets/bigLogo.png")} resizeMode="stretch" />
    </Container>
  );
};
