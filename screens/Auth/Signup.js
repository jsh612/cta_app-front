import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { meChecher } from "../../AuthContext";

export default ({ navigation }) => {
  const me = meChecher();
  console.log(me);

  return <Text>asdfasdfasdfasdfasfdasdfsafsdfasdf</Text>;
};
