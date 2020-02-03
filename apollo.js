import { AsyncStorage } from "react-native";
import { uris } from "./ip";

// ApolloClient 옵션 설정
const apolloClientOptions = {
  // uri: "http://localhost:4000",
  uri: uris,
  //requet = 매 요청시 미다 실행
  request: async operation => {
    //매 요청마다 토큰을 header에 전달하여 유저 인증이 되었음을 보여준다
    const token = await AsyncStorage.getItem("jwt");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
};

export default apolloClientOptions;
