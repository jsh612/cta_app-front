import React, { useState } from "react";
import styled from "styled-components";
import Picker from "../../components/Picker";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import ScoreInput from "../../components/ScoreInput";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import ScroeButton from "../../components/ScoreButton";
import styles from "../../styles";
// TouchableWithoutFeedback를 아래와 같이 가져올 경우 작동 안할 수 있음
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.View`
  width: ${constants.width / 1.3};
  height: 50px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: ${styles.blackColor};
`;

export default ({ navigation }) => {
  const [round, setRound] = useState("");
  const [episode, setEpisode] = useState("");

  const accInput = useInput("");
  const taxAccInput = useInput("");

  const roundArr = [
    { label: "동차GS", value: "1" },
    { label: "2순환", value: "2" },
    { label: "3순환", value: "3" }
  ];

  const episodeArr = [
    { label: "1회", value: "1" },
    { label: "2회", value: "2" },
    { label: "3회", value: "3" },
    { label: "4회", value: "4" },
    { label: "5회", value: "5" },
    { label: "6회", value: "6" },
    { label: "7회", value: "7" },
    { label: "8회", value: "8" },
    { label: "9회", value: "9" },
    { label: "10회", value: "10" },
    { label: "11회", value: "11" },
    { label: "12회", value: "12" }
  ];

  const pickerHandler = stateSet => {
    return value => stateSet(value);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container behavior="padding" enabled>
        <ContentWrapper>
          <Title>몇 순환?</Title>
          <Picker
            placeholder="순환 선택"
            items={roundArr}
            onValueChange={pickerHandler(setRound)}
          />
        </ContentWrapper>
        <ContentWrapper>
          <Title>몇 회?</Title>
          <Picker
            placeholder="회차 선택"
            items={episodeArr}
            onValueChange={pickerHandler(setEpisode)}
          />
        </ContentWrapper>
        <ContentWrapper>
          <Title>회1 점수</Title>
          <ScoreInput
            {...accInput}
            placeholder="회1 점수(숫자만 입력)"
            keyboardType="numeric"
          />
        </ContentWrapper>
        <ContentWrapper>
          <Title>회2 점수</Title>
          <ScoreInput
            {...taxAccInput}
            placeholder="회2 점수(숫자만 입력)"
            keyboardType="numeric"
          />
        </ContentWrapper>
        <ScroeButton text="성적 제출" />
        <ScroeButton text="순위 확인" />
      </Container>
    </TouchableWithoutFeedback>
  );
};
