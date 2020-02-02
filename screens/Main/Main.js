import React, { useState } from "react";
import styled from "styled-components";
import { Keyboard, Alert, StatusBar } from "react-native";
// TouchableWithoutFeedback를 아래와 같이 가져올 경우 작동 안할 수 있음
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useMutation } from "@apollo/react-hooks";

import Picker from "../../components/Picker";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import ScoreInput from "../../components/ScoreInput";
import ScroeButton from "../../components/ScoreButton";
import { CREATE_ACC, CREATE_TAX_ACC } from "../../queries/ScoreQueries";
import { basicInfo } from "../../utils";
import IOSAd from "../../components/Ad";

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.blackColor};
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.blackColor};
`;

const MenuWrapper = styled.View`
  background-color: white;
  width: ${constants.width}px;
  flex: 9;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
`;

const ContentWrapper = styled.View`
  width: ${constants.width / 1.3}px;
  height: 50px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

const Column = styled.View`
  width: ${constants.width / 1.1}px;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  box-shadow: black 3px 7px 15px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  color: white;
`;

const InputWrraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${constants.width / 1.1}px;
  height: 100px;
  margin-top: 50px;
  padding: 10px 30px;
  border-radius: 8px;
  background-color: black;
  box-shadow: black 2px 2px 15px;
`;

const BtnWrapper = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }) => {
  const [round, setRound] = useState("");
  const [episode, setEpisode] = useState("");
  const [academy, setAcademy] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const accInput = useInput("");
  const taxAccInput = useInput("");

  const [accMutation] = useMutation(CREATE_ACC, {
    variables: {
      score: Number(accInput.value),
      round: round,
      episode: episode,
      academy,
      year
    }
  });

  const [taxAccMutation] = useMutation(CREATE_TAX_ACC, {
    variables: {
      score: Number(taxAccInput.value),
      round: round,
      episode: episode,
      academy,
      year
    }
  });

  const submitHandler = async () => {
    try {
      setLoading(true);
      if (round === "" || episode === "") {
        return Alert.alert("순환과 회차를 모두 선택해주세요");
      }
      if (accInput.value === "" && taxAccInput.value === "") {
        return Alert.alert("한 과목 이상의 성적을 입력 해주세요.");
      }
      if (Number(accInput.value) > 100 || Number(taxAccInput.value) > 100) {
        return Alert.alert("성적을 100점 이하로 입력 해주세요");
      }
      if (accInput.value !== "") {
        await accMutation();
      }
      if (taxAccInput.value !== "") {
        await taxAccMutation();
      }
      accInput.setValue("");
      taxAccInput.setValue("");
      setEpisode("");
      return Alert.alert("성적이 제출되었습니다.");
    } catch (error) {
      console.log("성적입력 error:", error);
      return Alert.alert("입력된 성적을 확인해 주세요");
    } finally {
      setLoading(false);
    }
  };

  const goRank = () => navigation.navigate("Rank");

  const { roundArr, episodeArr, academyArr, yearArr } = basicInfo();

  const pickerHandler = stateSet => {
    return value => stateSet(value);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <Container behavior="padding" enabled>
          <MenuWrapper>
            <Column>
              <ContentWrapper>
                <Picker
                  placeholder="연도 선택"
                  items={yearArr}
                  value={year}
                  onValueChange={pickerHandler(setYear)}
                  size={["150px", "40px"]}
                />
                <Picker
                  placeholder="학원 선택"
                  items={academyArr}
                  value={academy}
                  onValueChange={pickerHandler(setAcademy)}
                  size={["150px", "40px"]}
                />
              </ContentWrapper>
              <ContentWrapper>
                <Picker
                  placeholder="순환 선택"
                  items={roundArr}
                  value={round}
                  onValueChange={pickerHandler(setRound)}
                  size={["150px", "40px"]}
                />
                <Picker
                  placeholder="회차 선택"
                  items={episodeArr}
                  value={episode}
                  onValueChange={pickerHandler(setEpisode)}
                  size={["150px", "40px"]}
                />
              </ContentWrapper>
            </Column>
            <InputWrraper>
              <Title>회1</Title>
              <ScoreInput
                {...accInput}
                placeholder="회1 점수"
                keyboardType="numeric"
              />
              <Title>회2</Title>
              <ScoreInput
                {...taxAccInput}
                placeholder="회2 점수"
                keyboardType="numeric"
              />
            </InputWrraper>
          </MenuWrapper>
          <BtnWrapper>
            <ScroeButton
              text="성적 제출"
              onPress={submitHandler}
              loading={loading}
            />
            <ScroeButton text="순위 확인" onPress={goRank} />
          </BtnWrapper>
        </Container>
        <IOSAd />
      </>
    </TouchableWithoutFeedback>
  );
};
