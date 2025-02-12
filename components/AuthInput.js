import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 1.7}px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${props => props.theme.blackColor};
  border: 0px white solid;
  color: white;
  font-size: 17px;
  font-weight: 900;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "done", // returnKeyType --> 폰 키보드에서 return의 타입
  onSubmitEditing = () => null, // 작성이 완료 되어서 제출시 이벤트
  autoCorrect = false,
  password = false,
  autoFocus = false
}) => (
  <Container>
    <TextInput
      style={{ borderBottomWidth: 2 }}
      placeholderTextColor={"white"}
      placeholder={placeholder}
      value={value}
      autoCapitalize={autoCapitalize}
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      secureTextEntry={password}
      selectionColor={"white"}
      autoFocus={autoFocus}
    />
  </Container>
);

AuthInput.propTypes = {
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

export default AuthInput;
