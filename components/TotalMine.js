import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Platform,
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Table, Row, Cols } from "react-native-table-component";

import constants from "../constants";
import styles from "../styles";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { ME } from "../queries/AuthQueries";
import { episodeSort, mineList } from "../utils";

const Touchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${styles.blackColor};
  border-radius: 10px;
  width: ${props =>
    props.customWidth ? props.customWidth : constants.width / 1.4};
  margin: 5px 0px;
  padding: 5px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 900;
  font-size: 17px;
`;

const ContentContainer = styled.View`
  background-color: white;
  padding: 23px;
  align-items: center;
  border-radius: 4px;
  position: relative;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 5px 15px 0px 0px;
  z-index: 1;
`;

const TableWrapper = styled.View`
  flex: 1;
  padding: 5px;
  margin-top: 30px;
  background-color: #fff;
  width: ${constants.width / 1.3};
`;

const TotalMine = ({ round, academy, year, title, customWidth }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cols, setCols] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [makingColsBool, setMakingColsBool] = useState(false);

  const [trigger, { data, loading, refetch }] = useLazyQuery(ME, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      return setLoaded(true);
    }
  });

  const accResult =
    loaded && data
      ? data.me.accs.filter(acc => {
          return (
            acc.academy === academy && acc.round === round && acc.year === year
          );
        })
      : null;

  const taxAccResult =
    loaded && data
      ? data.me.taxAccs.filter(taxAcc => {
          return (
            taxAcc.academy === academy &&
            taxAcc.round === round &&
            taxAcc.year === year
          );
        })
      : null;

  const totalAccResult =
    loaded && data
      ? data.me.totalAccs.filter(totalAcc => {
          return (
            totalAcc.academy === academy &&
            totalAcc.round === round &&
            totalAcc.year === year
          );
        })
      : null;

  const tableInfo = {
    tableHead: ["회1", "회2", "회1 + 회2"],
    tableSubHead: [
      "회차",
      "순위",
      "점수",
      "회차",
      "순위",
      "점수",
      "회차",
      "순위",
      "점수"
    ]
  };

  if (loaded && data) {
    episodeSort(accResult, taxAccResult, totalAccResult);
  }
  if (round !== 0 && academy !== "" && year !== 0 && makingColsBool && loaded) {
    const colsObj = mineList(accResult, taxAccResult, totalAccResult);
    setCols(colsObj);
    if (colsObj) {
      setMakingColsBool(false);
      setModalVisible(true);
    }
    setLoaded(false);
  }

  return (
    <Touchable
      customWidth={customWidth}
      onPress={() => {
        if (
          round === 0 ||
          !round ||
          academy === "" ||
          !academy ||
          year === 0 ||
          !year
        ) {
          return Alert.alert("모든사항을 선택해 주세요");
        }
        setMakingColsBool(true);
        trigger();
        // setModalVisible(true);
      }}
    >
      {loading ? <ActivityIndicator color={"white"} /> : <Title>{title}</Title>}
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.7}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={"slideInLeft"}
        animationOut={"slideOutRight"}
      >
        <ContentContainer>
          <CloseBtn onPress={() => setModalVisible(false)}>
            <Ionicons
              size={50}
              name={Platform.OS === "ios" ? "ios-close" : "md-close"}
            />
          </CloseBtn>
          <ScrollView>
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
                  textStyle={{ textAlign: "center", fontSize: 15 }}
                />
                {cols ? (
                  <Cols
                    textStyle={{
                      margin: 0.5,
                      marginTop: 10,
                      marginBottom: 10,
                      textAlign: "center",
                      fontSize: 13
                    }}
                    data={[
                      cols.accsEpisode,
                      cols.accsRankArr,
                      cols.accsScoreArr,
                      cols.taxAccsEpisode,
                      cols.taxAccsRankArr,
                      cols.taxAccsScoreArr,
                      cols.totoalEpisode,
                      cols.totalRankArr,
                      cols.totalScoreArr
                    ]}
                  />
                ) : null}
              </Table>
            </TableWrapper>
          </ScrollView>
        </ContentContainer>
      </Modal>
    </Touchable>
  );
};

TotalMine.propTypes = {
  title: PropTypes.string.isRequired,
  customWidth: PropTypes.string.isRequired,
  academy: PropTypes.string,
  round: PropTypes.number,
  year: PropTypes.number
};

export default TotalMine;
