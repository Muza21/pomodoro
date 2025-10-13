import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { formatTime } from "../utils/time";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Load completed sessions
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("completedSessions");
      if (saved) setCompletedSessions(parseInt(saved, 10));
    })();
  }, []);

  // Save sessions
  useEffect(() => {
    AsyncStorage.setItem("completedSessions", completedSessions.toString());
  }, [completedSessions]);

  // Timer logic
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

  const handleTimerComplete = () => {
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

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    if (mode === "focus") setSecondsLeft(settings.focusDuration * 60);
    if (mode === "shortBreak") setSecondsLeft(settings.shortBreakDuration * 60);
    if (mode === "longBreak") setSecondsLeft(settings.longBreakDuration * 60);
  };

  const getModeLabel = () =>
    mode === "focus"
      ? "Focus"
      : mode === "shortBreak"
      ? "Short Break"
      : "Long Break";

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, textAlign: "center" }}>Pomodoro Timer</Text>
      <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 10 }}>
        Mode: {getModeLabel()}
      </Text>

      <Text style={{ fontSize: 48, textAlign: "center", marginVertical: 20 }}>
        {formatTime(secondsLeft)}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
        {!isRunning ? (
          <TouchableOpacity
            onPress={handleStart}
            style={{
              padding: 12,
              backgroundColor: "#4CAF50",
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "white" }}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handlePause}
            style={{
              padding: 12,
              backgroundColor: "#FF9800",
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "white" }}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleReset}
          style={{ padding: 12, backgroundColor: "#F44336", borderRadius: 5 }}
        >
          <Text style={{ color: "white" }}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Completed Focus Sessions: {completedSessions}
      </Text>

      <TouchableOpacity
        onPress={onNavigateToSettings}
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: "#2196F3",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
