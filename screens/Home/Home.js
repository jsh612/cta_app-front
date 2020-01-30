import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { RefreshControl, ActivityIndicator } from "react-native";
import constants from "../../constants";
import Notice from "../../components/Notice";
import { useQuery } from "@apollo/react-hooks";
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

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const [newdata, setNewData] = useState(null);

  const { data, loading, refetch } = useQuery(SEE_NOTICE, {
    variables: {
      name: `${new Date().getFullYear()}`
    },
    fetchPolicy: "network-only",
    onCompleted: data => {
      const {
        seeNotice: { ctaNotice, eduNotice }
      } = data;
      setNewData({ ctaNotice, eduNotice });
      console.log(newdata ? newdata.ctaNotice : null);
    }
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log("순위 새로고침 오류:", error);
    } finally {
      setRefreshing(false);
    }
  };

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
            {newdata && newdata.ctaNotice && newdata.ctaNotice.length !== 0 ? (
              newdata.ctaNotice.map(notice => {
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
            {newdata && newdata.eduNotice && newdata.eduNotice.length !== 0 ? (
              newdata.eduNotice.map(notice => {
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
