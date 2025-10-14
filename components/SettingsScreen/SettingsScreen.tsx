import React, { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Settings } from "../../types";
import {
  SettingsIcon,
  FocusIcon,
  ShortBreakIcon,
  LongBreakIcon,
  SessionsIcon,
  SaveIcon,
  BackIcon,
} from "../../icons/AppIcons";
import { NumberControl } from "../NumberControl/NumberControl";
import { settingsScreenStyles as styles } from "./SettingsScreen.styles";
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
  const [focusDuration, setFocusDuration] = useState(settings.focusDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(
    settings.shortBreakDuration
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    settings.longBreakDuration
  );
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(
    settings.sessionsBeforeLongBreak
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSave = () => {
    if (
      focusDuration <= 0 ||
      shortBreakDuration <= 0 ||
      longBreakDuration <= 0 ||
      sessionsBeforeLongBreak <= 0
    ) {
      alert("⚠️ Values cannot be 0. Please set them to 1 or more.");
      return;
    }

    const newSettings: Settings = {
      focusDuration,
      shortBreakDuration,
      longBreakDuration,
      sessionsBeforeLongBreak,
    };

    onSave(newSettings);
    onBack();
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <View style={styles.settingsTitle}>
          <SettingsIcon size={20} color="#424242" />
          <Text style={styles.settingsTitleText}>Settings</Text>
        </View>
        <Text style={styles.headerSubtitle}>Customize your Pomodoro timer</Text>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLabelContainer}>
          <FocusIcon size={24} color="#FF8FA3" />
          <Text style={styles.settingLabel}>Focus Duration</Text>
        </View>
        <NumberControl
          value={focusDuration}
          setter={setFocusDuration}
          unit="min"
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLabelContainer}>
          <ShortBreakIcon size={24} color="#81C784" />
          <Text style={styles.settingLabel}>Short Break</Text>
        </View>

        <NumberControl
          value={shortBreakDuration}
          setter={setShortBreakDuration}
          unit="min"
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLabelContainer}>
          <LongBreakIcon size={24} color="#64B5F6" />
          <Text style={styles.settingLabel}>Long Break</Text>
        </View>
        <NumberControl
          value={longBreakDuration}
          setter={setLongBreakDuration}
          unit="min"
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLabelContainer}>
          <SessionsIcon size={24} color="#FFA000" />
          <Text style={styles.settingLabel}>Sessions Before Long Break</Text>
        </View>
        <NumberControl
          value={sessionsBeforeLongBreak}
          setter={setSessionsBeforeLongBreak}
          unit="sessions"
          min={1}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <SaveIcon size={20} color="white" />
          <Text style={styles.saveButtonText}> Save Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <BackIcon size={20} color="#757575" />
          <Text style={styles.backButtonText}> Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
