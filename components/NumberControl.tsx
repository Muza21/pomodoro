import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PlusIcon, MinusIcon } from "../icons/AppIcons";

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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  valueContainer: {
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#333",
  },
  valueUnit: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },
});
