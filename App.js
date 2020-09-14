import React, { useState } from "react";
import { Text, View, StatusBar, SafeAreaView } from "react-native";
import Row from "./misc/Row/Row";
import Button from "./misc/Buttons/Button";
import s from "./App.s";

export default function App() {
  const [currentValue, setCurrentValue] = useState("");
  const [operator, setOperator] = useState(null);
  const [previewValue, setPreviewValue] = useState(null);

  const current = parseFloat(currentValue);
  const previous = parseFloat(previewValue);

  const handleTap = (type, value) => {
    if (type === "number") {
      setCurrentValue(`${currentValue}${value}`);
    }
    if (type === "operator") {
      setOperator(value);
      setPreviewValue(currentValue);
      setCurrentValue("");
    }

    if (type === "clear") {
      setCurrentValue("");
      setOperator(null);
      setPreviewValue(null);
    }
    if (type === "posneg") {
      setCurrentValue(`${current * -1}`);
    }

    if (type === "percentage") {
      setCurrentValue(`${current * 0.01}`);
    }

    if (type === "equal") {
      if (operator === "+") {
        setCurrentValue(previous + current);
        setOperator(null);
        setPreviewValue(null);
      }

      if (operator === "/") {
        if (current === 0) {
          return setCurrentValue("Can't divide on 0");
        }
        setCurrentValue(previous / current);
        setOperator(null);
        setPreviewValue(null);
      }

      if (operator === "-") {
        setCurrentValue(previous - current);
        setOperator(null);
        setPreviewValue(null);
      }

      if (operator === "*") {
        setCurrentValue(previous * current);
        setOperator(null);
        setPreviewValue(null);
      }
    }
  };
  const [memory, setMemory] = useState(0);
  const memoryNum = parseFloat(memory);
  const mPlus = () => {
    setMemory(current + memoryNum);
    setCurrentValue("");
  };
  const mMinus = () => {
    setMemory(memoryNum - currentValue);
    setCurrentValue("");
  };
  const mClear = () => {
    setMemory(0);
  };
  const mShow = () => {
    setCurrentValue(memory);
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={s.memory__container}>
          <Text style={s.memory}>{memory}</Text>
        </View>
        <Text style={s.value}>{currentValue}</Text>
        <Row>
          <Button
            text="C"
            theme="secondary"
            onPress={() => handleTap("clear")}
          />
          <Button
            disabled={!currentValue}
            text="+/-"
            theme="secondary"
            onPress={() => handleTap("posneg")}
          />
          <Button
            disabled={!currentValue}
            text="%"
            theme="secondary"
            onPress={() => handleTap("percentage")}
          />
          <Button
            disabled={!currentValue}
            text="/"
            theme="accent"
            onPress={() => handleTap("operator", "/")}
          />
        </Row>
        <Row>
          <Button text="mr" onPress={() => mShow(memory)} />
          <Button text="mc" onPress={() => mClear(memory)} />
          <Button
            disabled={!currentValue}
            text="m-"
            onPress={() => mMinus(currentValue)}
          />
          <Button
            disabled={!currentValue}
            text="m+"
            theme="accent"
            onPress={() => mPlus(currentValue)}
          />
        </Row>
        <Row>
          <Button text="7" onPress={() => handleTap("number", 7)} />
          <Button text="8" onPress={() => handleTap("number", 8)} />
          <Button text="9" onPress={() => handleTap("number", 9)} />
          <Button
            disabled={!currentValue}
            text="x"
            theme="accent"
            onPress={() => handleTap("operator", "*")}
          />
        </Row>
        <Row>
          <Button text="4" onPress={() => handleTap("number", 4)} />
          <Button text="5" onPress={() => handleTap("number", 5)} />
          <Button text="6" onPress={() => handleTap("number", 6)} />
          <Button
            disabled={!currentValue}
            text="-"
            theme="accent"
            onPress={() => handleTap("operator", "-")}
          />
        </Row>
        <Row>
          <Button text="1" onPress={() => handleTap("number", 1)} />
          <Button text="2" onPress={() => handleTap("number", 2)} />
          <Button text="3" onPress={() => handleTap("number", 3)} />
          <Button
            disabled={!currentValue}
            text="+"
            theme="accent"
            onPress={() => handleTap("operator", "+")}
          />
        </Row>
        <Row>
          <Button
            text="0"
            size="double"
            onPress={() => handleTap("number", 0)}
          />
          <Button
            text="."
            disabled={!currentValue && currentValue.includes(".")}
            onPress={() => handleTap("number", ".")}
          />
          <Button text="=" theme="accent" onPress={() => handleTap("equal")} />
        </Row>
      </SafeAreaView>
    </View>
  );
}
