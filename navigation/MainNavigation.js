import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import Main from "../screens/Main/Main";
import Rank from "../screens/Main/Rank";
import Home from "../screens/Main/Home";
import NavIcon from "../components/NavIcon";
import NavLabel from "../components/NavLabel";
import styles from "../styles";
import { Platform } from "react-native";

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
    Main: {
      screen: stackFactory(Main, {
        headerBackTitle: null,
        title: "Main"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavLabel size={26} focused={focused} title="Main" />
        )
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            size={26}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            focused={focused}
            color={styles.redColor}
          />
        )
      }
    }
    // Namu: {
    //   screen: stackFactory(Namu, {
    //     headerBackTitle: null,
    //     title: "나무"
    //   }),
    //   navigationOptions: {
    //     tabBarIcon: ({ focused }) => (
    //       <NavLabel size={26} focused={focused} title="나무" />
    //     )
    //   }
    // }
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
