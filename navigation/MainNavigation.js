import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import Namu from "../screens/Main/Namu";
import InputScore from "../screens/Main/InputScore";
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
      InputScore: {
        screen: InputScore,
        navigationOptions: {
          title: "성적입력"
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
        headerBackTitle: null
      }
    }
  );

const mainTab = createBottomTabNavigator(
  {
    Namu: {
      screen: stackFactory(Namu, {
        headerBackTitle: null,
        title: "나무"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavLabel size={26} focused={focused} title="나무" />
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
      showLabel: false
    }
  }
);

export default createAppContainer(mainTab);
