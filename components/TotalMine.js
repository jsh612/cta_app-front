import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Platform, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

import constants from "../constants";
import styles from "../styles";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../queries/AuthQueries";

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
  padding: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: relative;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 5px 15px 0px 0px;
`;

const Column = styled.View`
  margin-top: 30px;
`;

const ContentText = styled.Text`
  font-size: 17px;
`;

const TotalMine = ({ round, academy, year, title, content, customWidth }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newData, setNewData] = useState({});

  const { data, loading } = useQuery(ME, {
    fetchPolicy: "network-only"
  });

  const accResult = (!loading
    ? data.me.accs.find(acc => {
        return (
          acc.academy === academy && acc.round === round && acc.year === year
        );
      })
    : null) || { rank: "-", score: "-" };

  const taxAccResult = (!loading
    ? data.me.taxAccs.find(taxAcc => {
        return (
          taxAcc.academy === academy &&
          taxAcc.round === round &&
          taxAcc.year === year
        );
      })
    : null) || { rank: "-", score: "-" };

  const totalAccResult = (!loading
    ? data.me.totalAccs.find(totalAcc => {
        return (
          totalAcc.academy === academy &&
          totalAcc.round === round &&
          totalAcc.year === year
        );
      })
    : null) || { rank: "-", score: "-" };

  console.log(totalAccResult);
  return (
    <Touchable customWidth={customWidth} onPress={() => setModalVisible(true)}>
      <Title>{title}</Title>
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.9}
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
            <Column>
              <ContentText>{content}</ContentText>
            </Column>
          </ScrollView>
        </ContentContainer>
      </Modal>
    </Touchable>
  );
};

TotalMine.propTypes = {
  title: PropTypes.string.isRequired,
  customWidth: PropTypes.string.isRequired,
  round: PropTypes.number.isRequired,
  academy: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired
};

export default TotalMine;
