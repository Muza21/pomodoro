import { StyleSheet } from "react-native";

export const numberControlsStyles = StyleSheet.create({
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
