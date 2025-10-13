import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { Settings } from "./Timer";

interface SettingsScreenProps {
  settings: Settings;
  onSave: (newSettings: Settings) => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onSave,
  onBack,
}) => {
  const [focusDuration, setFocusDuration] = useState(
    settings.focusDuration.toString()
  );
  const [shortBreakDuration, setShortBreakDuration] = useState(
    settings.shortBreakDuration.toString()
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    settings.longBreakDuration.toString()
  );
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(
    settings.sessionsBeforeLongBreak.toString()
  );

  const handleSave = () => {
    const newSettings: Settings = {
      focusDuration: parseInt(focusDuration, 10),
      shortBreakDuration: parseInt(shortBreakDuration, 10),
      longBreakDuration: parseInt(longBreakDuration, 10),
      sessionsBeforeLongBreak: parseInt(sessionsBeforeLongBreak, 10),
    };
    onSave(newSettings);
    onBack();
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Settings</Text>

      <Text>Focus Duration (minutes):</Text>
      <TextInput
        value={focusDuration}
        onChangeText={setFocusDuration}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Short Break Duration (minutes):</Text>
      <TextInput
        value={shortBreakDuration}
        onChangeText={setShortBreakDuration}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Long Break Duration (minutes):</Text>
      <TextInput
        value={longBreakDuration}
        onChangeText={setLongBreakDuration}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Sessions Before Long Break:</Text>
      <TextInput
        value={sessionsBeforeLongBreak}
        onChangeText={setSessionsBeforeLongBreak}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Save Settings
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={{ color: "white", textAlign: "center" }}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  saveButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginVertical: 10,
  },
  backButton: {
    padding: 15,
    backgroundColor: "#757575",
    borderRadius: 5,
  },
};
