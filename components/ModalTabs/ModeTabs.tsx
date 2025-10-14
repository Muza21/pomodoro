import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FocusIcon, ShortBreakIcon, LongBreakIcon } from "../../icons/AppIcons";
import type { TimerMode } from "../../types";
import { modalTabsStyles as styles } from "./ModalTabs.styles";

interface ModeTabsProps {
  mode: TimerMode;
  switchMode: (mode: TimerMode) => void;
}

export const ModeTabs: React.FC<ModeTabsProps> = ({ mode, switchMode }) => {
  const getTabStyle = (tabMode: TimerMode) => {
    let borderColor = "#E0E0E0";
    let backgroundColor = "transparent";

    if (tabMode === "focus" && mode === "focus") {
      borderColor = "#FF8FA3";
      backgroundColor = "#FFF5F7";
    } else if (tabMode === "shortBreak" && mode === "shortBreak") {
      borderColor = "#81C784";
      backgroundColor = "#F1F8F4";
    } else if (tabMode === "longBreak" && mode === "longBreak") {
      borderColor = "#64B5F6";
      backgroundColor = "#F0F7FB";
    }

    return { borderColor, backgroundColor };
  };

  return (
    <View style={styles.modeTabsContainer}>
      <TouchableOpacity
        onPress={() => switchMode("focus")}
        style={[styles.modeTab, getTabStyle("focus")]}
      >
        <View style={styles.modeTabContent}>
          <FocusIcon
            color={mode === "focus" ? "#4A1F2E" : "#757575"}
            size={16}
          />
          <Text
            style={[
              styles.modeTabText,
              { color: mode === "focus" ? "#4A1F2E" : "#757575" },
            ]}
          >
            Focus
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => switchMode("shortBreak")}
        style={[styles.modeTab, getTabStyle("shortBreak")]}
      >
        <View style={styles.modeTabContent}>
          <ShortBreakIcon
            color={mode === "shortBreak" ? "#1B4D2C" : "#757575"}
            size={16}
          />
          <Text
            style={[
              styles.modeTabText,
              { color: mode === "shortBreak" ? "#1B4D2C" : "#757575" },
            ]}
          >
            Short Break
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => switchMode("longBreak")}
        style={[styles.modeTab, getTabStyle("longBreak")]}
      >
        <View style={styles.modeTabContent}>
          <LongBreakIcon
            color={mode === "longBreak" ? "#1E3A5F" : "#757575"}
            size={16}
          />
          <Text
            style={[
              styles.modeTabText,
              { color: mode === "longBreak" ? "#1E3A5F" : "#757575" },
            ]}
          >
            Long Break
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
