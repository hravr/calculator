import React from "react";
import { TouchableOpacity, Text } from "react-native";
import s from "./Button.s";

export default ({ onPress, text, size, theme, ...rest }) => {
  const buttonStyles = [s.button];
  const textStyles = [s.text];

  if (size == "double") {
    buttonStyles.push(s.buttonDouble);
  }

  if (theme == "secondary") {
    buttonStyles.push(s.buttonSecondary);
    textStyles.push(s.textSecondary);
  } else if (theme == "accent") {
    buttonStyles.push(s.buttonAccent);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles} {...rest}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};
