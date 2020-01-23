import React from "react";
import RNPickerSelect from "react-native-picker-select";
import PropTyes from "prop-types";
import { StyleSheet, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const Wrapper = styled.View`
  align-items: center;
  width: 200px;
  height: 40px;
`;

const Icon = styled(Ionicons)`
  margin: 6px;
`;

const Picker = ({ placeholder, onValueChange, items }) => (
  <Wrapper>
    <RNPickerSelect
      style={{ ...pickerSelectStyles, width: 100 }}
      placeholder={{ label: placeholder }}
      onValueChange={onValueChange}
      items={items}
      Icon={() => {
        return (
          <Icon
            name={
              Platform.OS === "ios" ? "ios-arrow-down" : "md-arrow-dropdown"
            }
            size={30}
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
    display: "flex"
  }
});

Picker.proptypes = {
  placeholder: PropTyes.string.isRequired,
  onValueChange: PropTyes.func.isRequired,
  items: PropTyes.array.isRequired
};

export default Picker;
