import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timer } from "./components/Timer/Timer";
import { SettingsScreen } from "./components/SettingsScreen/SettingsScreen";
import { Settings } from "./types";

type Screen = "Timer" | "Settings";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("Timer");
  const [settings, setSettings] = useState<Settings>({
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
  });

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("pomodoroSettings");
      if (saved) setSettings(JSON.parse(saved));
    })();
  }, []);

  const saveSettings = async (newSettings: Settings) => {
    await AsyncStorage.setItem("pomodoroSettings", JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {currentScreen === "Timer" ? (
        <Timer
          settings={settings}
          onNavigateToSettings={() => setCurrentScreen("Settings")}
        />
      ) : (
        <SettingsScreen
          settings={settings}
          onSave={saveSettings}
          onBack={() => setCurrentScreen("Timer")}
        />
      )}
    </View>
  );
}
