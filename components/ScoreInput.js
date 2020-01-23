import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  height: 40px;
`;

const TextInput = styled.TextInput`
  width: 200px;
  padding: 10px;
  background-color: ${props => props.theme.greyColor};
  border-radius: 4px;
  border: 1px gray solid;
  border-radius: 4px;
  font-size: 16px;
`;

const ScoreInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "done", // returnKeyType --> 폰 키보드에서 return의 타입
  onSubmitEditing = () => null, // 작성이 완료 되어서 제출시 이벤트
  autoCorrect = false
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      autoCapitalize={autoCapitalize}
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
    />
  </Container>
);

ScoreInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool
};

export default ScoreInput;
