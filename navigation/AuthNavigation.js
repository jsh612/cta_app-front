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
      title: "가입하기"
    }
  }
});

export default createAppContainer(AuthNavigation);
