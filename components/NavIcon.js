import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTyes from "prop-types";
import styled from "styled-components";
import styles from "../styles";

const View = styled.View`
  background-color: black;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 40px;
`;

const NavIcon = ({
  name,
  color = styles.blackColor,
  size = 35,
  focused = true
}) => (
  <Ionicons
    name={name}
    color={focused ? color : "white"}
    size={size}
    style={{ paddingTop: 10 }}
  />
);

NavIcon.proptypes = {
  name: PropTyes.string.isRequired,
  color: PropTyes.string,
  size: PropTyes.number,
  focused: PropTyes.bool
};

export default NavIcon;
