import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StyleSheet, RefreshControl } from "react-native";
// TouchableWithoutFeedback를 아래와 같이 가져올 경우 작동 안할 수 있음
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { Table, Row, Cols } from "react-native-table-component";

import Picker from "../../components/Picker";
import constants from "../../constants";
import ScroeButton from "../../components/ScoreButton";
import styles from "../../styles";
import { SEE_ROUND } from "../../queries/ScoreQueries";
import { basicInfo, makeRankList, sortFunc, seeMe } from "../../utils";
import { useMeChecker } from "../../AuthContext";

const Container = styled.View`
  align-items: center;
`;

const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: 10px 0px;
`;

const HeaderColumn = styled.View`
  flex: 1;
  width: ${constants.width / 1.3};
  height: 50px;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ScrollView = styled.ScrollView`
  width: ${constants.width};
  margin-top: 200px;
  background-color: red;
`;

const TableWrapper = styled.View`
  flex: 1;
  padding: 16px;
  padding-top: 30px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: ${styles.blackColor};
`;

export default ({ navigation }) => {
  const [round, setRound] = useState("");
  const [episode, setEpisode] = useState(null);
  const [academy, setAcademy] = useState(null);
  const [fetchloading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [skipBool, setSkipBool] = useState(true);

  const { data, loding, refetch } = useQuery(SEE_ROUND, {
    variables: {
      round,
      episode,
      academy
    },
    //skip 속성을 통해 순위버튼 클릭시 쿼리 작동되도록 함.
    skip: !round || !episode || skipBool
  });

  const {
    accsScoreArr,
    accsRankArr,
    taxAccsScoreArr,
    taxAccsRankArr,
    totalScoreArr,
    totalRankArr
  } = makeRankList(data);

  const { roundArr, episodeArr, academyArr } = basicInfo();

  const pickerHandler = stateSet => {
    return value => stateSet(value);
  };

  const tableInfo = !skipBool
    ? {
        tableHead: ["회1", "회2", "회1 + 회2"],
        tableSubHead: ["순위", "점수", "순위", "점수", "순위", "점수"],
        tableData: [
          sortFunc(accsRankArr),
          sortFunc(accsScoreArr, false),
          sortFunc(taxAccsRankArr),
          sortFunc(taxAccsScoreArr, false),
          sortFunc(totalRankArr),
          sortFunc(totalScoreArr, false)
        ]
      }
    : null;

  const rankWatcher = () => {
    // skipBool 조정을 통해 useQuery skip 여부 통제
    try {
      setLoading(true);
      setSkipBool(false);
    } catch (error) {
      console.log("순위가져오기 오류::", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      if (!(!round || !episode || skipBool)) {
        setRefreshing(true);
        refetch();
      }
    } catch (e) {
      console.log("순위 새로고침 오류:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {});
  return (
    <Container>
      <Header>
        <HeaderColumn>
          <Title>어느 학원?</Title>
          <Picker
            placeholder="학원 선택"
            items={academyArr}
            value={academy}
            onValueChange={pickerHandler(setAcademy)}
          />
        </HeaderColumn>
        <HeaderColumn>
          <Title>순환</Title>
          <Picker
            placeholder="순환 선택"
            items={roundArr}
            value={round}
            onValueChange={pickerHandler(setRound)}
            size={["100px", "40px"]}
          />
          <Title>회차</Title>
          <Picker
            placeholder="회차 선택"
            items={episodeArr}
            value={episode}
            onValueChange={pickerHandler(setEpisode)}
            size={["100px", "40px"]}
          />
        </HeaderColumn>
        <ScroeButton text={"순위 보기"} onPress={rankWatcher} />
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {!skipBool ? (
          <TableWrapper>
            <Table
              borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
              textStyle={{ fontAlign: "center" }}
            >
              <Row
                data={tableInfo.tableHead}
                style={tablestyles.head}
                textStyle={tablestyles.text}
              />
              <Row
                data={tableInfo.tableSubHead}
                style={tablestyles.head}
                textStyle={tablestyles.text}
              />
              <Cols
                heightArr={[50, 50, 50, 50]}
                data={tableInfo.tableData}
                textStyle={tablestyles.text}
              />
            </Table>
          </TableWrapper>
        ) : null}
      </ScrollView>
    </Container>
  );
};

const tablestyles = StyleSheet.create({
  head: { height: 40, backgroundColor: styles.lightGreyColor },
  text: { margin: 6, textAlign: "center", fontSize: 20 }
});
