import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PlusIcon, MinusIcon } from "../../icons/AppIcons";
import { numberControlsStyles as styles } from "./NumberControl.styles";
interface NumberControlProps {
  value: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  unit?: string;
}

export const NumberControl: React.FC<NumberControlProps> = ({
  value,
  setter,
  min = 1,
  unit,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const increment = () => setter((prev) => prev + 1);
  const decrement = () => setter((prev) => (prev > min ? prev - 1 : prev));

  const handlePressIn = (action: () => void) => {
    action();

    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(action, 50);
    }, 250);

    intervalRef.current = timeout;
  };

  const handlePressOut = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={() => handlePressIn(decrement)}
        onPressOut={handlePressOut}
        style={styles.button}
      >
        <MinusIcon size={32} color="#333" />
      </TouchableOpacity>

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
        {unit && <Text style={styles.valueUnit}>{unit}</Text>}
      </View>

      <TouchableOpacity
        onPressIn={() => handlePressIn(increment)}
        onPressOut={handlePressOut}
        style={styles.button}
      >
        <PlusIcon size={32} color="#333" />
      </TouchableOpacity>
    </View>
  );
};
