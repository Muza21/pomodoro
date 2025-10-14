import React, { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Settings } from "./Timer";
import {
  SettingsIcon,
  FocusIcon,
  ShortBreakIcon,
  LongBreakIcon,
  SessionsIcon,
  SaveIcon,
  BackIcon,
} from "../icons/AppIcons";
import { NumberControl } from "./NumberControl";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  settingsTitle: {
    paddingTop: 20,
    paddingHorizontal: 28,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  settingsTitleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#757575",
  },
  settingItem: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  actionButtons: {
    marginTop: 20,
    gap: 12,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: "row",
    gap: 6,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  backButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    gap: 6,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#757575",
  },
});
