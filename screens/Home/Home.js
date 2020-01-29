import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text } from "react-native";
import constants from "../../constants";
import Notice from "../../components/Notice";
import { useQuery } from "@apollo/react-hooks";
import { SEE_NOTICE } from "../../queries/NoticeQueries";

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
`;

export default () => {
  const { data, loading, refetch } = useQuery(SEE_NOTICE, {
    variables: {
      name: `${new Date().getFullYear()}`
    }
  });

  const {
    seeNotice: { ctaNotice, eduNotice }
  } = data;
  console.log(ctaNotice);
  useEffect(() => {
    refetch();
  });
  return (
    <Container>
      <Column>
        <Header>
          <HeaderTitle>수험 소식</HeaderTitle>
        </Header>
        <ScrollView>
          <NoticeList>
            {ctaNotice && ctaNotice.length !== 0
              ? ctaNotice.map(notice => {
                  return (
                    <Notice
                      key={notice.id}
                      title={notice.title}
                      content={notice.content}
                      url={notice.url}
                    />
                  );
                })
              : null}
          </NoticeList>
        </ScrollView>
      </Column>
      <Column>
        <Header>
          <HeaderTitle>학습 정보</HeaderTitle>
        </Header>
        <ScrollView>
          <NoticeList>
            {eduNotice && eduNotice.length !== 0
              ? eduNotice.map(notice => {
                  return (
                    <Notice
                      key={notice.id}
                      title={notice.title}
                      content={notice.content}
                      url={notice.url}
                    />
                  );
                })
              : null}
          </NoticeList>
        </ScrollView>
      </Column>
    </Container>
  );
};
