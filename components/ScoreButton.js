import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity`
  margin: 10px 5px;
  background-color: ${props => props.theme.orangeColor};
  width: ${constants.width / 2}px;
  border-radius: 7px;
  padding: 10px;
`;

const Container = styled.View``;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 900;
`;

const ScoreButton = ({ text, onPress, loading = false, bgColor = null }) => (
  //# disabled
  //  - 로딩중일 경우 컴포넌트와의 상호작용 기능을 끊기 위해
  //  - https://facebook.github.io/react-native/docs/touchablewithoutfeedback#disabled
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {/* ActivityIndicator -> 로딩 표시 나타냄 */}
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

ScoreButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default ScoreButton;
