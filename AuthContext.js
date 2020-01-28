import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "./queries/AuthQueries";

//context는 object인데 useContext를 통해서 어디서든 접근 가능
export const AuthContext = createContext();

/* 

  AuthProvider -> context.provider 컴포넌트 출력

 */
export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  // #Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할
  // #props.children
  //  모든 컴포넌트에서 props.children를 사용할 수 있다
  //  props.children은 컴포넌트의 여는 태그와 닫는 태그 사이의 내용을 포함

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const [isMe, setIsMe] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const logUserIn = async token => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("isLoggedIn", "true"); //key value 모두 string
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false"); //key value 모두 string
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const meChecker = () => {
    try {
      if (isMe === "") {
        setIsLoading(true);
        const { data, loading, refetch } = useQuery(ME);
        if (!loading) {
          setIsLoading(loading);
          setIsMe({ data, loading, refetch });
        }
      }
      return isMe;
    } catch (error) {
      console.log("Auth meChecker 오류::", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logUserIn, logUserOut, meChecker }}
    >
      {children}
    </AuthContext.Provider>
  );
};
/* 

   useContext를 이용한 함수들 -> 해당 함수를 이용하여 다른 컴포넌트에서 context 접근가능

 */
export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};

export const useMeChecker = () => {
  const { meChecker } = useContext(AuthContext);
  return meChecker;
};
