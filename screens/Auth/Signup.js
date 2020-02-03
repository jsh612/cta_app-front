import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import AuthInput from "../../components/AuthInput";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ACCOUNT } from "../../queries/AuthQueries";
import AuthButton from "../../components/AuthButton";
import styles from "../../styles";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 120px; */
  background: ${styles.blackColor};
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const usernameInput = useInput("");
  const pwInput = useInput("");

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      password: pwInput.value
    }
  });

  const handleSingup = async () => {
    const { value: username } = usernameInput;
    const { value: pw } = pwInput;

    if (!username || !pw) {
      return Alert.alert("아이디와 비밀번호를 모두 입력해 주세요");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount: newUser }
      } = await createAccountMutation();
      if (newUser) {
        navigation.navigate("AuthHome", { username });
        Alert.alert("가입이 완료", "로그인 화면으로 이동");
      }
    } catch (error) {
      Alert.alert("해당 아이디는 이미 존재합니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AuthInput {...usernameInput} placeholder="ID" />
        <AuthInput {...pwInput} placeholder="비밀번호" password={true} />
        <AuthButton text="가입하기" onPress={handleSingup} loading={loading} />
      </Container>
    </TouchableWithoutFeedback>
  );
};
