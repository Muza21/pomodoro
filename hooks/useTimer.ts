import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { Vibration, AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { TimerMode, Settings } from "../types";

export const useTimer = (settings: Settings) => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const appState = useRef(AppState.currentState);
  const backgroundTimeRef = useRef<number | null>(null);

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
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [isRunning, secondsLeft]);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/active/) &&
      nextAppState.match(/inactive|background/)
    ) {
      if (isRunning) {
        backgroundTimeRef.current = Date.now();
        await AsyncStorage.setItem(
          "timerState",
          JSON.stringify({
            secondsLeft,
            isRunning: true,
            backgroundTime: backgroundTimeRef.current,
            mode,
          })
        );
      }
    }

    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      const savedState = await AsyncStorage.getItem("timerState");
      if (savedState) {
        const state = JSON.parse(savedState);
        if (state.isRunning && state.backgroundTime) {
          const timeInBackground = Math.floor(
            (Date.now() - state.backgroundTime) / 1000
          );
          const newSecondsLeft = Math.max(
            0,
            state.secondsLeft - timeInBackground
          );

          setSecondsLeft(newSecondsLeft);

          if (newSecondsLeft === 0) {
            handleTimerComplete();
          }
        }
        await AsyncStorage.removeItem("timerState");
      }
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0 && isRunning) handleTimerComplete();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (!isRunning) {
      if (mode === "focus") setSecondsLeft(settings.focusDuration * 60);
      if (mode === "shortBreak")
        setSecondsLeft(settings.shortBreakDuration * 60);
      if (mode === "longBreak") setSecondsLeft(settings.longBreakDuration * 60);
    }
  }, [settings, mode, isRunning]);

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

  const start = () => setIsRunning(true);
  const pause = () => {
    setIsRunning(false);
    AsyncStorage.removeItem("timerState");
  };

  const reset = () => {
    setIsRunning(false);
    AsyncStorage.removeItem("timerState");
    if (mode === "focus") setSecondsLeft(settings.focusDuration * 60);
    if (mode === "shortBreak") setSecondsLeft(settings.shortBreakDuration * 60);
    if (mode === "longBreak") setSecondsLeft(settings.longBreakDuration * 60);
  };

  const skip = () => {
    setIsRunning(false);
    AsyncStorage.removeItem("timerState");
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
    AsyncStorage.removeItem("timerState");
    setMode(newMode);
    if (newMode === "focus") setSecondsLeft(settings.focusDuration * 60);
    if (newMode === "shortBreak")
      setSecondsLeft(settings.shortBreakDuration * 60);
    if (newMode === "longBreak")
      setSecondsLeft(settings.longBreakDuration * 60);
  };

  return {
    mode,
    secondsLeft,
    isRunning,
    completedSessions,
    start,
    pause,
    reset,
    skip,
    switchMode,
  };
};
