import { StyleSheet } from "react-native";

export const modalTabsStyles = StyleSheet.create({
  modeTabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 60,
    flexWrap: "wrap",
  },
  modeTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "transparent",
  },
  modeTabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modeTabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
