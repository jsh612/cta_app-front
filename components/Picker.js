import React from "react";
import RNPickerSelect from "react-native-picker-select";
import PropTyes from "prop-types";
import { StyleSheet, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const Wrapper = styled.View`
  align-items: center;
  width: ${props => props.size[0]};
  height: ${props => props.size[1]};
`;

const Icon = styled(Ionicons)`
  margin: 8px 5px;
`;

const Picker = ({
  size = ["200px", "40px"],
  placeholder,
  onValueChange,
  items,
  value
}) => (
  <Wrapper size={size}>
    <RNPickerSelect
      style={{ ...pickerSelectStyles, width: 100 }}
      placeholder={{ label: placeholder }}
      onValueChange={onValueChange}
      items={items}
      value={value}
      Icon={() => {
        return (
          <Icon
            name={
              Platform.OS === "ios" ? "ios-arrow-down" : "md-arrow-dropdown"
            }
            size={25}
          />
        );
      }}
    />
  </Wrapper>
);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    padding: 5,
    paddingLeft: 10,
    display: "flex"
  },
  inputAndroid: {
    fontSize: 16,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    padding: 5,
    paddingLeft: 10,
    display: "flex"
  }
});

Picker.proptypes = {
  placeholder: PropTyes.string.isRequired,
  onValueChange: PropTyes.func.isRequired,
  items: PropTyes.array.isRequired,
  size: PropTyes.arrayOf(PropTyes.string)
};

export default Picker;
