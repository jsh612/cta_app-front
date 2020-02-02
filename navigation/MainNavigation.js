import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Main from "../screens/Main/Main";
import Home from "../screens/Home/Home";
import NavIcon from "../components/NavIcon";
import styles from "../styles";
import { Platform } from "react-native";
import Profile from "../screens/Profile";
import { mainStackFactory } from "./stackMaker";

const mainTab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            focused={focused}
            color={"blue"}
          />
        )
      }
    },
    Main: {
      screen: mainStackFactory(Main, {
        headerBackTitle: null,
        title: "성적 공유",
        headerShown: false
      }),
      navigationOptions: {
        cardStyle: { backgroundColor: "red" },
        tabBarIcon: ({ focused }) => (
          <NavIcon
            name={Platform.OS === "ios" ? "ios-apps" : "md-apps"}
            focused={focused}
            color={"blue"}
          />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            focused={focused}
            color={"blue"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "black",
        borderTopColor: "black",
        padding: 5,
        height: 60
      }
    },
    defaultNavigationOptions: {
      backgroundColor: "red"
    }
  }
);

export default createAppContainer(mainTab);
