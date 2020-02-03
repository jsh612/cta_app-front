import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import AuthHome from "../screens/Auth/AuthHome";
import Signup from "../screens/Auth/Signup";

const AuthNavigation = createStackNavigator({
  AuthHome: {
    screen: AuthHome,
    navigationOptions: {
      headerShown: false
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerBackTitle: "로그인",
      title: "가입하기",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "900"
      },
      headerBackTitleStyle: {
        fontSize: 17,
        fontWeight: "700"
      },
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black"
      }
    }
  }
});

export default createAppContainer(AuthNavigation);
