import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Platform, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "expo";

import constants from "../constants";
import styles from "../styles";

const Touchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${styles.blackColor};
  border-radius: 10px;
  width: ${constants.width / 1.4}px;
  margin: 10px 0px;
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

const UrlText = styled.Text`
  margin-top: 5px;
  font-size: 17px;
  text-decoration: underline;
  text-align: right;
`;

const Notice = ({ title, content, url }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Touchable onPress={() => setModalVisible(true)}>
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
              <UrlText onPress={() => Linking.openURL(url)}>{url}</UrlText>
            </Column>
          </ScrollView>
        </ContentContainer>
      </Modal>
    </Touchable>
  );
};

Notice.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default Notice;
