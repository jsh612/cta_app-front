import React, { useState } from "react";
import styled from "styled-components";
import { Text, ScrollView } from "react-native";
import Picker from "../components/Picker";
import constants from "../constants";
import styles from "../styles";
import { basicInfo } from "../utils";
import ScoreButton from "../components/ScoreButton";
import TotalMine from "../components/TotalMine";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
`;
const ColumnWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  background-color: blanchedalmond;
`;

const Column = styled.View`
  width: ${constants.width / 1.1};
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const Title = styled.Text`
  font-weight: 900;
  font-size: 30px;
  text-align: center;
  color: ${styles.blackColor};
  margin-bottom: 50px;
`;

export default () => {
  const [round, setRound] = useState(0);
  const [academy, setAcademy] = useState("");
  const [year, setYear] = useState(0);

  const { roundArr, academyArr, yearArr } = basicInfo();

  const pickerHandler = stateSet => {
    return value => stateSet(value);
  };
  return (
    <Container>
      <ColumnWrapper>
        <Title>나의 성적 조회</Title>
        <Column>
          <Picker
            placeholder="연도"
            items={yearArr}
            value={year}
            onValueChange={pickerHandler(setYear)}
            size={["85px", "40px"]}
          />
          <Picker
            placeholder="학원"
            items={academyArr}
            value={academy}
            onValueChange={pickerHandler(setAcademy)}
            size={["85px", "40px"]}
          />
          <Picker
            placeholder="순환"
            items={roundArr}
            value={round}
            onValueChange={pickerHandler(setRound)}
            size={["85px", "40px"]}
          />
          <TotalMine
            round={round}
            academy={academy}
            year={year}
            customWidth="70px"
            title="조회"
          />
        </Column>
      </ColumnWrapper>
      <ColumnWrapper>
        <ScoreButton customWidth="200px" text="로그아웃" onPress={() => null} />
      </ColumnWrapper>
    </Container>
  );
};
