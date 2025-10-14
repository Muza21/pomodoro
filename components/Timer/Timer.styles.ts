import { StyleSheet } from "react-native";

export const timerStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timerDisplay: {
    alignItems: "center",
    marginBottom: 50,
  },
  timerText: {
    fontSize: 120,
    fontWeight: "700",
    letterSpacing: -5,
    lineHeight: 120,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 60,
  },
  smallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  smallButtonText: {
    fontSize: 24,
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  mainButtonText: {
    fontSize: 28,
    color: "white",
  },
  sessionCounter: {
    alignItems: "center",
    marginBottom: 30,
  },
  sessionLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 8,
  },
  sessionCount: {
    fontSize: 32,
    fontWeight: "700",
  },
  settingsButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#424242",
  },
});
