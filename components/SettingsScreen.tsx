import React, { useState } from "react";
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

  const handleSave = () => {
    const newSettings: Settings = {
      focusDuration,
      shortBreakDuration,
      longBreakDuration,
      sessionsBeforeLongBreak,
    };
    onSave(newSettings);
    onBack();
  };

  const increment = (value: number, setter: (val: number) => void) => {
    setter(value + 1);
  };

  const decrement = (value: number, setter: (val: number) => void) => {
    if (value > 1) {
      setter(value - 1);
    }
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
        <View style={styles.controlContainer}>
          <TouchableOpacity
            onPress={() => decrement(focusDuration, setFocusDuration)}
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>−</Text>
          </TouchableOpacity>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{focusDuration}</Text>
            <Text style={styles.valueUnit}>min</Text>
          </View>
          <TouchableOpacity
            onPress={() => increment(focusDuration, setFocusDuration)}
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLabelContainer}>
          <ShortBreakIcon size={24} color="#81C784" />
          <Text style={styles.settingLabel}>Short Break</Text>
        </View>
        <View style={styles.controlContainer}>
          <TouchableOpacity
            onPress={() => decrement(shortBreakDuration, setShortBreakDuration)}
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>−</Text>
          </TouchableOpacity>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{shortBreakDuration}</Text>
            <Text style={styles.valueUnit}>min</Text>
          </View>
          <TouchableOpacity
            onPress={() => increment(shortBreakDuration, setShortBreakDuration)}
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLabelContainer}>
          <LongBreakIcon size={24} color="#64B5F6" />
          <Text style={styles.settingLabel}>Long Break</Text>
        </View>
        <View style={styles.controlContainer}>
          <TouchableOpacity
            onPress={() => decrement(longBreakDuration, setLongBreakDuration)}
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>−</Text>
          </TouchableOpacity>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{longBreakDuration}</Text>
            <Text style={styles.valueUnit}>min</Text>
          </View>
          <TouchableOpacity
            onPress={() => increment(longBreakDuration, setLongBreakDuration)}
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLabelContainer}>
          <SessionsIcon size={24} color="#FFA000" />
          <Text style={styles.settingLabel}>Sessions Before Long Break</Text>
        </View>
        <View style={styles.controlContainer}>
          <TouchableOpacity
            onPress={() =>
              decrement(sessionsBeforeLongBreak, setSessionsBeforeLongBreak)
            }
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>−</Text>
          </TouchableOpacity>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{sessionsBeforeLongBreak}</Text>
            <Text style={styles.valueUnit}>sessions</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              increment(sessionsBeforeLongBreak, setSessionsBeforeLongBreak)
            }
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
        </View>
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
  controlContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButtonText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
  },
  valueContainer: {
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#333",
  },
  valueUnit: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
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
