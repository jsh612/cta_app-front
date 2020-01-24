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
import { makeScoreArr, makeRankArr } from "../../utils";

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
  const [accsRank, setAccsRank] = useState(null);
  const [taxAccsRank, setTaxAccsRank] = useState(null);
  const [totalAccsRank, setTotalAccsRank] = useState(null);
  const [skipBool, setSkipBool] = useState(true);

  const { data, loding, refetch } = useQuery(SEE_ROUND, {
    variables: {
      round: `${round}-${episode}`,
      academy
    },
    //skip 속성을 통해 순위버튼 클릭시 쿼리 작동되도록 함.
    skip: !round || !episode || skipBool
  });

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

  const academyArr = [
    { label: "우리", value: "우리" },
    { label: "나무", value: "나무" },
    { label: "위너스", value: "위너스" }
  ];

  const pickerHandler = stateSet => {
    return value => stateSet(value);
  };

  const tableInfo =
    !skipBool && (accsRank || taxAccsRank || totalAccsRank)
      ? {
          tableHead: ["회1", "회2", "회1 + 회2"],
          tableSubHead: ["순위", "점수", "순위", "점수", "순위", "점수"],
          tableData: [
            accsRank.rankArr,
            accsRank.scoreArr,
            taxAccsRank.rankArr,
            taxAccsRank.scoreArr,
            totalAccsRank.rankArr,
            totalAccsRank.scoreArr
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

  const rankHandler = subject => {
    if (data && data.seeRound && data.seeRound[subject]) {
      const originData = data.seeRound[subject];
      const scoreArr = makeScoreArr(originData);
      const rankArr = makeRankArr(scoreArr);
      return { scoreArr, rankArr };
    }
    return;
  };

  useEffect(() => {
    setAccsRank(rankHandler("accs"));
    setTaxAccsRank(rankHandler("taxAccs"));
    setTotalAccsRank(rankHandler("totalAccs"));
  }, [data]);
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
        {!skipBool && (accsRank || taxAccsRank || totalAccsRank) ? (
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
