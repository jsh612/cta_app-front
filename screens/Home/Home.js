import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ActivityIndicator, StatusBar } from "react-native";
import constants from "../../constants";
import Notice from "../../components/Notice";
import { useLazyQuery } from "@apollo/react-hooks";

import { SEE_NOTICE } from "../../queries/NoticeQueries";
import styles from "../../styles";
import IOSAd from "../../components/Ad";
import { reverser } from "../../utils";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  background-color: black;
`;

const Wrapper = styled.View`
  width: ${constants.width}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  box-shadow: white 0px 0px 9px;
`;

const Column = styled.View`
  position: relative;
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  height: ${constants.height / 3}px;
  width: ${constants.width / 1.1}px;
  padding-top: 10px;
  border-radius: 10px;
  background-color: white;
`;

const Header = styled.View`
  background-color: ${props => props.theme.orangeColor};
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -20px;
  padding: 5px;
  border-radius: 10px;
  z-index: 10;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 900;
  color: white;
  padding: 3px;
`;

const ScrollView = styled.ScrollView`
  width: ${constants.width / 1.1}px;
`;

const NoticeList = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export default ({ navigation }) => {
  const [newData, setNewData] = useState(null);

  const [trigger, { data }] = useLazyQuery(SEE_NOTICE, {
    variables: {
      name: `${new Date().getFullYear()}`
    },
    fetchPolicy: "network-only",
    onCompleted: data => {
      const {
        seeNotice: { ctaNotice, eduNotice }
      } = data;
      setNewData({ ctaNotice, eduNotice });
    }
  });

  useEffect(() => {
    //navigation.addListener을 이용해여 탭 선택 되었을 시 공지를 fetch하도록 한다.
    if (data && newData) {
      const focusFunc = navigation.addListener("didFocus", () => {
        trigger();
      });
      return () => {
        focusFunc.remove();
        return;
      };
    }
  }, [newData]);

  useEffect(() => {
    trigger();
  }, []);

  return (
    <Container>
      <StatusBar barStyle={"black-content"} />
      <Wrapper>
        <Column>
          <Header>
            <HeaderTitle>수험 소식</HeaderTitle>
          </Header>
          <ScrollView>
            <NoticeList>
              {newData &&
              newData.ctaNotice &&
              newData.ctaNotice.length !== 0 ? (
                reverser(newData.ctaNotice).map(notice => {
                  return (
                    <Notice
                      key={notice.id}
                      title={notice.title}
                      content={notice.content}
                      url={notice.url}
                    />
                  );
                })
              ) : (
                <ActivityIndicator size="large" color={styles.blackColor} />
              )}
            </NoticeList>
          </ScrollView>
        </Column>
      </Wrapper>
      <Wrapper>
        <Column>
          <Header>
            <HeaderTitle>학습 정보</HeaderTitle>
          </Header>
          <ScrollView>
            <NoticeList>
              {newData &&
              newData.eduNotice &&
              newData.eduNotice.length !== 0 ? (
                reverser(newData.eduNotice).map(notice => {
                  return (
                    <Notice
                      key={notice.id}
                      title={notice.title}
                      content={notice.content}
                      url={notice.url}
                    />
                  );
                })
              ) : (
                <ActivityIndicator size="large" color={styles.blackColor} />
              )}
            </NoticeList>
          </ScrollView>
        </Column>
      </Wrapper>
      <IOSAd />
    </Container>
  );
};
