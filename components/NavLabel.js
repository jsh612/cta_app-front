import React from "react";
import styled from "styled-components";
import PropTyes from "prop-types";
import styles from "../styles";

const Text = styled.Text`
  font-weight: 900;
  font-size: ${props => props.size};
  color: ${props => (props.focused ? props.color : styles.darkGreyColor)};
  padding-top: 10px;
`;

const NavLabel = ({ focused, title, size, color = styles.redColor }) => (
  <Text size={size} focused={focused} color={color}>
    {title}
  </Text>
);

NavLabel.proptypes = {
  title: PropTyes.string.isRequired,
  focused: PropTyes.bool,
  size: PropTyes.number.isRequired,
  color: PropTyes.string
};

export default NavLabel;
