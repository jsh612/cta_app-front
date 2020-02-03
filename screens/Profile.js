import React, { useState } from "react";
import styled from "styled-components";
import { StatusBar } from "react-native";
import Picker from "../components/Picker";
import constants from "../constants";
import styles from "../styles";
import { basicInfo } from "../utils";
import ScoreButton from "../components/ScoreButton";
import TotalMine from "../components/TotalMine";
import { useLogOut } from "../AuthContext";
import IOSAd from "../components/Ad";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.blackColor};
`;

const Title = styled.Text`
  font-weight: 900;
  font-size: 30px;
  text-align: center;
  color: ${styles.blackColor};
  margin-bottom: 50px;
`;

const PickerWrapper = styled.View`
  margin: 30px 0px;
`;

const ColumnWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 3;
`;

const WhiteWrapper = styled(ColumnWrapper)`
  background-color: white;
  width: ${constants.width}px;
  padding-top: 40px;
  flex: 10;
  border-radius: 40px;
  margin-top: -40px;
`;

const Column = styled.View`
  justify-content: center;
  align-items: center;
`;

export default () => {
  const [round, setRound] = useState(0);
  const [academy, setAcademy] = useState("");
  const [year, setYear] = useState(0);
  const { roundArr, academyArr, yearArr } = basicInfo();

  const pickerHandler = stateSet => {
    return value => stateSet(value);
  };

  const logOut = useLogOut();

  return (
    <Container>
      <WhiteWrapper>
        <Title>나의 성적 종합</Title>
        <Column>
          <Picker
            placeholder="연도"
            items={yearArr}
            value={year}
            onValueChange={pickerHandler(setYear)}
            size={["150px", "40px"]}
          />
          <PickerWrapper>
            <Picker
              margin={"10px"}
              placeholder="학원"
              items={academyArr}
              value={academy}
              onValueChange={pickerHandler(setAcademy)}
              size={["150px", "40px"]}
            />
          </PickerWrapper>
          <Picker
            placeholder="순환"
            items={roundArr}
            value={round}
            onValueChange={pickerHandler(setRound)}
            size={["150px", "40px"]}
          />
        </Column>
      </WhiteWrapper>
      <ColumnWrapper>
        <TotalMine round={round} academy={academy} year={year} title="조회" />
        <ScoreButton text="로그아웃" onPress={logOut} />
      </ColumnWrapper>
      <IOSAd />
    </Container>
  );
};
