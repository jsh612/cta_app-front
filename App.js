import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { persistCache } from "apollo-cache-persist";
import { AsyncStorage, View, Text } from "react-native";
import { ApolloProvider } from "@apollo/react-hooks";

import apolloClientOptions from "./apollo";
import { AppLoading } from "expo";
import { ThemeProvider } from "styled-components";
import styles from "./styles";
import { AuthProvider } from "./AuthContext";
import NavController from "./components/NavController";
import Loader from "./components/Loader";

export default function App() {
  const [loaded, setLoaded] = useState(false); // 로딩 상태 확인 state
  const [client, setClient] = useState(null); // client 생성 여부 확인 state
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      //font preload
      await Font.loadAsync({
        ...Ionicons.font
      });
      //asset preload
      await Asset.loadAsync([
        require("./assets/logo.png"),
        require("./assets/bigLogo.png")
      ]);

      //cache 생성
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });

      //ApolloClient 생성
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });

      // #로그인 여부 설정
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn"); //AsyncStorage 에서 해당 값 가져오기
      if (isLoggedIn === null || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <Loader />
  );
}
