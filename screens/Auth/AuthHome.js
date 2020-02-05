import React, { useState, useEffect } from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";

import AuthButton from "../../components/AuthButton";
import { LOGIN } from "../../queries/AuthQueries";
import { useLogIn } from "../../AuthContext";
import styles from "../../styles";

const View = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${styles.blackColor};
`;

const LogoImg = styled.Image`
  height: ${constants.height / 5}px;
  margin-bottom: 80px;
`;

export default ({ navigation }) => {
  const pwInput = useInput("");
  const idInput = useInput(navigation.getParam("username", ""));

  const logIn = useLogIn();

  const [loading, setLoading] = useState(false);
  const [loginMutation] = useMutation(LOGIN, {
    variables: {
      username: idInput.value,
      password: pwInput.value
    }
  });

  const handledLogin = async () => {
    const { value: id } = idInput;
    const { value: pw } = pwInput;

    if (!id || !pw) {
      return Alert.alert("ID 와 비밀번호를 모두 작성 해주세요");
    }
    try {
      setLoading(true);
      const {
        data: { login }
      } = await loginMutation();
      logIn(login);
    } catch (error) {
      Alert.alert("아이디와 비밀번호를 확인해 주세요");
      console.log("login error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View behavior="padding" enabled>
        <LogoImg
          source={require("../../assets/bigLogo.png")}
          resizeMode="contain"
        />
        <AuthInput {...idInput} placeholder="ID" autoFocus={true} />
        <AuthInput {...pwInput} placeholder="비밀번호" password={true} />
        <AuthButton loading={loading} text={"로그인"} onPress={handledLogin} />
        <AuthButton
          text={"가입하기"}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
