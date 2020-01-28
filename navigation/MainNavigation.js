import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import Main from "../screens/Main/Main";
import Rank from "../screens/Main/Rank";
import Home from "../screens/Home";
import NavIcon from "../components/NavIcon";
import styles from "../styles";
import { Platform } from "react-native";
import Profile from "../screens/Profile";

const stackFactory = (initRoute, customConifg) =>
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
        headerStyle: {
          backgroundColor: "green"
        },
        headerTitleStyle: {
          fontSize: 25
        }
      }
    }
  );

const mainTab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
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
      screen: stackFactory(Main, {
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
