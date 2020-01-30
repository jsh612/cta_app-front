import { createStackNavigator } from "react-navigation-stack";
import Rank from "../screens/Main/Rank";
import styles from "../styles";

//메인 화면 스택 생성 함수
export const mainStackFactory = (initRoute, customConifg) =>
  createStackNavigator(
    {
      InitRoute: {
        screen: initRoute,
        navigationOptions: {
          ...customConifg
        }
      },
      Rank: {
        screen: Rank,
        navigationOptions: {
          title: "순위"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitleVisible: false,
        headerTintColor: styles.blackColor,
        headerShown: false,
        headerStyle: {
          backgroundColor: "green"
        },
        headerTitleStyle: {
          fontSize: 25
        }
      }
    }
  );

// //홈 화면 스택 생성 함수
// export const homeStackFactory = (initRoute, customConifg) =>
//   createStackNavigator(
//     {
//       InitRoute: {
//         screen: initRoute,
//         navigationOptions: {
//           ...customConifg
//         }
//       }
//     },
//     {
//       defaultNavigationOptions: {
//         headerTintColor: styles.blackColor,
//         headerStyle: {
//           backgroundColor: "green"
//         },
//         headerTitleStyle: {
//           fontSize: 25
//         }
//       }
//     }
//   );
