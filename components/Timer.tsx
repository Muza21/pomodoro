import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { formatTime } from "../utils/time";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { Vibration } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  FocusIcon,
  LongBreakIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
  SettingsIcon,
  ShortBreakIcon,
  SkipIcon,
} from "../icons/AppIcons";

export type TimerMode = "focus" | "shortBreak" | "longBreak";

export type Settings = {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
};

interface TimerProps {
  settings: Settings;
  onNavigateToSettings: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  settings,
  onNavigateToSettings,
}) => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [lastSessionDay, setLastSessionDay] = useState(
    new Date().toDateString()
  );

  useEffect(() => {
    const checkDayReset = async () => {
      const today = new Date().toDateString();
      if (lastSessionDay !== today) {
        setCompletedSessions(0);
        setLastSessionDay(today);
        await AsyncStorage.setItem("completedSessions", "0");
        await AsyncStorage.setItem("lastSessionDay", today);
      }
    };
    checkDayReset();
  }, [lastSessionDay]);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/alarm.mp3")
      );
      soundRef.current = sound;
    };
    loadSound();
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("completedSessions");
      if (saved) setCompletedSessions(parseInt(saved, 10));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("completedSessions", completedSessions.toString());
  }, [completedSessions]);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft]);

  const handleTimerComplete = async () => {
    setIsRunning(false);

    if (soundRef.current) await soundRef.current.replayAsync();
    Vibration.vibrate(1000);

    if (mode === "focus") {
      const newSessions = completedSessions + 1;
      setCompletedSessions(newSessions);

      if (newSessions % settings.sessionsBeforeLongBreak === 0) {
        setMode("longBreak");
        setSecondsLeft(settings.longBreakDuration * 60);
      } else {
        setMode("shortBreak");
        setSecondsLeft(settings.shortBreakDuration * 60);
      }
    } else {
      setMode("focus");
      setSecondsLeft(settings.focusDuration * 60);
    }

    setIsRunning(true);
  };

  useEffect(() => {
    if (mode === "focus") setSecondsLeft(settings.focusDuration * 60);
    if (mode === "shortBreak") setSecondsLeft(settings.shortBreakDuration * 60);
    if (mode === "longBreak") setSecondsLeft(settings.longBreakDuration * 60);
  }, [settings, mode]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    if (mode === "focus") setSecondsLeft(settings.focusDuration * 60);
    if (mode === "shortBreak") setSecondsLeft(settings.shortBreakDuration * 60);
    if (mode === "longBreak") setSecondsLeft(settings.longBreakDuration * 60);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (mode === "focus") {
      const newSessions = completedSessions + 1;
      setCompletedSessions(newSessions);

      if (newSessions % settings.sessionsBeforeLongBreak === 0) {
        setMode("longBreak");
        setSecondsLeft(settings.longBreakDuration * 60);
      } else {
        setMode("shortBreak");
        setSecondsLeft(settings.shortBreakDuration * 60);
      }
    } else {
      setMode("focus");
      setSecondsLeft(settings.focusDuration * 60);
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === "focus") setSecondsLeft(settings.focusDuration * 60);
    if (newMode === "shortBreak")
      setSecondsLeft(settings.shortBreakDuration * 60);
    if (newMode === "longBreak")
      setSecondsLeft(settings.longBreakDuration * 60);
  };

  const getBackgroundColor = () => {
    if (mode === "focus") return "#F5E6E8";
    if (mode === "shortBreak") return "#E8F5E9";
    return "#E3F2FD";
  };

  const getTextColor = () => {
    if (mode === "focus") return "#4A1F2E";
    if (mode === "shortBreak") return "#1B4D2C";
    return "#1E3A5F";
  };

  const getAccentColor = () => {
    if (mode === "focus") return "#FF8FA3";
    if (mode === "shortBreak") return "#81C784";
    return "#64B5F6";
  };

  const time = formatTime(secondsLeft).split(":");

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.modeTabsContainer}>
        <TouchableOpacity
          onPress={() => switchMode("focus")}
          style={[
            styles.modeTab,
            mode === "focus" && {
              borderColor: "#FF8FA3",
              backgroundColor: "#FFF5F7",
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <FocusIcon
              size={16}
              color={mode === "focus" ? "#4A1F2E" : "#757575"}
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
          style={[
            styles.modeTab,
            mode === "shortBreak" && {
              borderColor: "#81C784",
              backgroundColor: "#F1F8F4",
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <ShortBreakIcon
              size={16}
              color={mode === "shortBreak" ? "#1B4D2C" : "#757575"}
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
          style={[
            styles.modeTab,
            mode === "longBreak" && {
              borderColor: "#64B5F6",
              backgroundColor: "#F0F7FB",
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <LongBreakIcon
              size={16}
              color={mode === "longBreak" ? "#1E3A5F" : "#757575"}
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

      <View style={styles.timerDisplay}>
        <Text style={[styles.timerText, { color: getTextColor() }]}>
          {time[0]}
        </Text>
        <Text style={[styles.timerText, { color: getTextColor() }]}>
          {time[1]}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handleReset} style={styles.smallButton}>
          <ResetIcon size={26} color={getTextColor()} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={isRunning ? handlePause : handleStart}
          style={[styles.mainButton, { backgroundColor: getAccentColor() }]}
        >
          {isRunning ? (
            <PauseIcon size={36} color="#fff" />
          ) : (
            <PlayIcon size={36} color="#fff" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip} style={styles.smallButton}>
          <SkipIcon size={26} color={getTextColor()} />
        </TouchableOpacity>
      </View>

      <View style={styles.sessionCounter}>
        <Text style={styles.sessionLabel}>Completed Sessions</Text>
        <Text style={[styles.sessionCount, { color: getTextColor() }]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
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
