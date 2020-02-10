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
  /* box-shadow: white 0px 0px 3px; */

  /* 아래는 안드로이드용 코드
  border: solid 2px white; */
`;

const Icon = styled(Ionicons)`
  margin: 8px 8px;
  color: black;
`;

const Picker = ({
  size = ["200px", "40px"],
  placeholder,
  onValueChange,
  items,
  value
}) => (
  <Wrapper
    size={size}
    //아래는 안드로이드용
    // style={{
    //   borderStyle: "solid",
    //   borderBottomColor: "black",
    //   boderTopColor: "white",
    //   borderLeftColor: "white",
    //   borderRightColor: "white"
    // }}
  >
    <RNPickerSelect
      style={{
        ...pickerSelectStyles,
        width: 100
      }}
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
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "white",
    borderBottomColor: "black",
    borderRadius: 4,
    color: "black",
    padding: 5,
    paddingLeft: 20,
    display: "flex",
    fontWeight: "900"
  },
  inputAndroid: {
    fontSize: 16,
    height: 40,
    borderWidth: 2,
    borderColor: "white",
    borderBottomColor: "black",
    borderRadius: 4,
    color: "black",
    padding: 5,
    paddingLeft: 20,
    display: "flex",
    fontWeight: "900"
  }
});

Picker.proptypes = {
  placeholder: PropTyes.string.isRequired,
  onValueChange: PropTyes.func.isRequired,
  items: PropTyes.array.isRequired,
  size: PropTyes.arrayOf(PropTyes.string)
};

export default Picker;
