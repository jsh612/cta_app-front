import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { RefreshControl, ActivityIndicator } from "react-native";
import constants from "../../constants";
import Notice from "../../components/Notice";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { SEE_NOTICE } from "../../queries/NoticeQueries";
import styles from "../../styles";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const Column = styled.View`
  position: relative;
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  height: ${constants.height / 3};
  width: ${constants.width / 1.1};
  border: solid 2px black;
  padding-top: 10px;
`;

const Header = styled.View`
  background-color: black;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -20px;
  padding: 5px;
  border-radius: 10px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 900;
  color: white;
`;

const ScrollView = styled.ScrollView`
  width: ${constants.width / 1.1};
`;

const NoticeList = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [newData, setNewData] = useState(null);

  const [trigger, { data, loading, refetch }] = useLazyQuery(SEE_NOTICE, {
    variables: {
      name: `${new Date().getFullYear()}`
    },
    fetchPolicy: "network-only",
    onCompleted: data => {
      console.log("여기도:", data);
      const {
        seeNotice: { ctaNotice, eduNotice }
      } = data;
      setNewData({ ctaNotice, eduNotice });
    }
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // await refetch();
      trigger();
    } catch (error) {
      console.log("순위 새로고침 오류:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    //navigation.addListener을 이용해여 탭 선택 되었을 시 공지를 fetch하도록 한다.
    console.log("eff:");
    if (data && newData) {
      const focusFunc = navigation.addListener("didFocus", () => {
        trigger();
      });
      return () => focusFunc.remove();
    } else {
      trigger();
    }
  }, [newData]);

  useEffect(() => {
    trigger();
  }, []);

  return (
    <Container>
      <Column>
        <Header>
          <HeaderTitle>수험 소식</HeaderTitle>
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
        >
          <NoticeList>
            {newData && newData.ctaNotice && newData.ctaNotice.length !== 0 ? (
              newData.ctaNotice.reverse().map(notice => {
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
      <Column>
        <Header>
          <HeaderTitle>학습 정보</HeaderTitle>
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
        >
          <NoticeList>
            {newData && newData.eduNotice && newData.eduNotice.length !== 0 ? (
              newData.eduNotice.reverse().map(notice => {
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
    </Container>
  );
};
