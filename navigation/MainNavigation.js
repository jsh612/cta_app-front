import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Main from "../screens/Main/Main";
import Home from "../screens/Home/Home";
import NavIcon from "../components/NavIcon";
import styles from "../styles";
import { Platform } from "react-native";
import Profile from "../screens/Profile";
import { mainStackFactory, homeStackFactory } from "../utils";

const mainTab = createBottomTabNavigator(
  {
    Home: {
      screen: homeStackFactory(Home, {
        headerBackTitle: null,
        title: "공지"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            size={40}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            focused={focused}
            color={styles.blackColor}
          />
        )
      }
    },
    Main: {
      screen: mainStackFactory(Main, {
        headerBackTitle: null,
        title: "성적 공유"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            size={40}
            name={Platform.OS === "ios" ? "ios-create" : "md-create"}
            focused={focused}
            color={styles.blackColor}
          />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            size={40}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            focused={focused}
            color={styles.blackColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "green"
      }
    }
  }
);

export default createAppContainer(mainTab);
