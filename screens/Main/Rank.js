import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StyleSheet, RefreshControl, Alert, Platform } from "react-native";
// TouchableWithoutFeedback를 아래와 같이 가져올 경우 작동 안할 수 있음
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { Table, Row, Cols } from "react-native-table-component";

import Picker from "../../components/Picker";
import constants from "../../constants";
import ScoreButton from "../../components/ScoreButton";
import styles from "../../styles";
import { SEE_ROUND } from "../../queries/ScoreQueries";
import { basicInfo, makeRankList, sortFunc, average } from "../../utils";
import MyRank from "../../components/MyRank";
import NavIcon from "../../components/NavIcon";

const Container = styled.View`
  align-items: center;
  margin-top: 100px;
  position: relative;
`;

const BackBtn = styled.TouchableOpacity`
  align-self: flex-start;
  position: absolute;
  top: -50px;
  margin-left: 10px;
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
  background-color: green;
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
  const [episode, setEpisode] = useState("");
  const [academy, setAcademy] = useState("");
  const [year, setYear] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [skipBool, setSkipBool] = useState(true);
  const [info, setInfo] = useState({});
  const [newData, setNewData] = useState({});

  // const { data, refetch, loading, called } = useQuery(SEE_ROUND, {
  const [seeRoundExecute, { data, refetch, loading, called }] = useLazyQuery(
    SEE_ROUND,
    {
      variables: {
        round: info.round,
        episode: info.episode,
        academy: info.academy,
        year: info.year
      },
      onCompleted: data => {
        setNewData(data);
        // round === info.round &&
        // episode === info.episode &&
        // academy === info.academy &&
        // year === info.year
        //   ? setNewData(data)
        //   : null;
      },
      fetchPolicy: "network-only"
      //skip 속성을 통해 순위버튼 클릭시 쿼리 작동되도록 함.
      // skip:
      //   round === "" ||
      //   round !== info.round ||
      //   episode === "" ||
      //   episode !== info.episode ||
      //   academy === "" ||
      //   academy !== info.academy ||
      //   year === "" ||
      //   year !== info.year ||
      //   skipBool
    }
  );

  const {
    accsScoreArr,
    accsRankArr,
    taxAccsScoreArr,
    taxAccsRankArr,
    totalScoreArr,
    totalRankArr
  } = makeRankList(newData);

  const { roundArr, episodeArr, academyArr, yearArr } = basicInfo();

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
        ],
        averageData: [
          "평균",
          average(accsScoreArr),
          "평균",
          average(taxAccsScoreArr),
          "평균",
          average(totalScoreArr)
        ]
      }
    : null;

  const rankWatcher = async () => {
    // skipBool 조정을 통해 useQuery skip 여부 통제
    try {
      if (round && episode && academy && year) {
        setInfo({ round, episode, academy, year });
        if (!skipBool) {
          await refetch();
        } else {
          seeRoundExecute();
        }
        console.log("new::::", newData);
        setSkipBool(false);
      } else {
        Alert.alert("모든사항을 체크해 주세요");
      }
    } catch (error) {
      console.log("순위가져오기 오류::", error);
    }
  };

  const onRefresh = async () => {
    try {
      if (!(!round || !episode || skipBool)) {
        setRefreshing(true);
        await refetch();
      }
    } catch (e) {
      console.log("순위 새로고침 오류:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Container>
      <BackBtn onPress={() => navigation.goBack()}>
        <NavIcon
          size={40}
          name={Platform.OS === "ios" ? "ios-arrow-back" : "md--arrow-back"}
        />
      </BackBtn>
      <Header>
        <HeaderColumn>
          <Title>연도</Title>
          <Picker
            placeholder="연도"
            items={yearArr}
            value={year}
            onValueChange={pickerHandler(setYear)}
            size={["100px", "40px"]}
          />
          <Title>학원</Title>
          <Picker
            placeholder="학원 선택"
            items={academyArr}
            value={academy}
            onValueChange={pickerHandler(setAcademy)}
            size={["100px", "40px"]}
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
        <ScoreButton
          text={"순위 보기"}
          onPress={rankWatcher}
          loading={loading}
        />
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {!skipBool ? (
          <TableWrapper>
            <Table
              borderStyle={{ borderWidth: 2, borderColor: styles.blackColor }}
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
              <Row
                data={tableInfo.averageData}
                style={tablestyles.head}
                textStyle={tablestyles.text}
              />
              <MyRank
                borderStyle={{ borderWidth: 2, borderColor: styles.blackColor }}
                academy={info.academy}
                round={info.round}
                episode={info.episode}
                year={info.year}
                style={tablestyles.head}
                textStyle={tablestyles.text}
                skipBool={skipBool}
              />
              <Cols data={tableInfo.tableData} textStyle={tablestyles.text} />
            </Table>
          </TableWrapper>
        ) : null}
      </ScrollView>
    </Container>
  );
};

const tablestyles = StyleSheet.create({
  head: { height: 40, backgroundColor: styles.lightGreyColor },
  text: { margin: 6, textAlign: "center", fontSize: 18 }
});
