import React, { useState } from "react";
import styled from "styled-components";
import { RefreshControl, Alert, Platform, StatusBar } from "react-native";
// TouchableWithoutFeedback를 아래와 같이 가져올 경우 작동 안할 수 있음
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useLazyQuery } from "@apollo/react-hooks";
import { Table, Row, Cols } from "react-native-table-component";

import Picker from "../../components/Picker";
import constants from "../../constants";
import ScoreButton from "../../components/ScoreButton";
import { SEE_ROUND } from "../../queries/ScoreQueries";
import { basicInfo, makeRankList, sortFunc, average } from "../../utils";
import MyRank from "../../components/MyRank";
import BackIcon from "../../components/BackIcon";
import styles from "../../styles";
import IOSAd from "../../components/Ad";

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 100px;
  position: relative;
  background-color: black;
`;

const BackBtn = styled.TouchableOpacity`
  align-self: flex-start;
  position: absolute;
  top: 25px;
  margin-left: 13px;
`;

const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: white;
  width: ${constants.width}px;
  padding-top: 100px;
  border-radius: 40px;
  /* margin: 10px 0px; */
`;

const HeaderColumn = styled.View`
  flex: 1;
  width: ${constants.width / 1.3}px;
  height: 50px;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ScrollView = styled.ScrollView`
  width: ${constants.width}px;
  margin-top: 200px;
  background-color: black;
  border-radius: 10px;
`;

const TableWrapper = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;
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
          // await refetch();
          seeRoundExecute();
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
        // await refetch();
        seeRoundExecute();
      }
    } catch (error) {
      console.log("순위 새로고침 오류:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackBtn onPress={() => navigation.goBack()}>
          <BackIcon
            size={40}
            name={Platform.OS === "ios" ? "ios-arrow-back" : "md--arrow-back"}
          />
        </BackBtn>
        <HeaderColumn>
          <Picker
            placeholder="연도"
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
        </HeaderColumn>
        <HeaderColumn>
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
                style={{ height: 40, backgroundColor: styles.lightGreyColor }}
                textStyle={{ margin: 6, textAlign: "center", fontSize: 18 }}
              />
              <Row
                data={tableInfo.tableSubHead}
                style={{ height: 40, backgroundColor: styles.lightGreyColor }}
                textStyle={{ margin: 6, textAlign: "center", fontSize: 18 }}
              />
              <Row
                data={tableInfo.averageData}
                style={{ height: 40, backgroundColor: styles.lightGreyColor }}
                textStyle={{ margin: 6, textAlign: "center", fontSize: 18 }}
              />
              <MyRank
                borderStyle={{ borderWidth: 2, borderColor: styles.blackColor }}
                academy={info.academy}
                round={info.round}
                episode={info.episode}
                year={info.year}
                style={{ height: 40, backgroundColor: styles.lightGreyColor }}
                textStyle={{ margin: 6, textAlign: "center", fontSize: 18 }}
                skipBool={skipBool}
              />
              <Cols
                data={tableInfo.tableData}
                textStyle={{ margin: 6, textAlign: "center", fontSize: 15 }}
              />
            </Table>
          </TableWrapper>
        ) : null}
      </ScrollView>
      <IOSAd />
    </Container>
  );
};
