import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  PauseIcon,
  PlayIcon,
  ResetIcon,
  SettingsIcon,
  SkipIcon,
} from "../../icons/AppIcons";
import { useTimer } from "../../hooks/useTimer";
import {
  getAccentColor,
  getBackgroundColor,
  getTextColor,
} from "../../utils/colors";
import { ModeTabs } from "../ModalTabs/ModeTabs";
import { formatTime } from "../../utils/time";
import { Settings } from "../../types";
import { timerStyles as styles } from "./Timer.styles";

interface TimerProps {
  settings: Settings;
  onNavigateToSettings: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  settings,
  onNavigateToSettings,
}) => {
  const {
    mode,
    secondsLeft,
    isRunning,
    completedSessions,
    start,
    pause,
    reset,
    skip,
    switchMode,
  } = useTimer(settings);
  const time = formatTime(secondsLeft).split(":");

  return (
    <View
      style={[styles.container, { backgroundColor: getBackgroundColor(mode) }]}
    >
      <ModeTabs mode={mode} switchMode={switchMode} />

      <View style={styles.timerDisplay}>
        <Text style={[styles.timerText, { color: getTextColor(mode) }]}>
          {time[0]}
        </Text>
        <Text style={[styles.timerText, { color: getTextColor(mode) }]}>
          {time[1]}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={reset} style={styles.smallButton}>
          <ResetIcon size={26} color={getTextColor(mode)} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={isRunning ? pause : start}
          style={[styles.mainButton, { backgroundColor: getAccentColor(mode) }]}
        >
          {isRunning ? (
            <PauseIcon size={36} color="#fff" />
          ) : (
            <PlayIcon size={36} color="#fff" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={skip} style={styles.smallButton}>
          <SkipIcon size={26} color={getTextColor(mode)} />
        </TouchableOpacity>
      </View>

      <View style={styles.sessionCounter}>
        <Text style={styles.sessionLabel}>Completed Sessions</Text>
        <Text style={[styles.sessionCount, { color: getTextColor(mode) }]}>
          {completedSessions}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onNavigateToSettings}
        style={styles.settingsButton}
      >
        <SettingsIcon size={18} color="#424242" />
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
