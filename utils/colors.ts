import type { TimerMode } from "../types";

export const getBackgroundColor = (mode: TimerMode) => {
  if (mode === "focus") return "#F5E6E8";
  if (mode === "shortBreak") return "#E8F5E9";
  return "#E3F2FD";
};

export const getTextColor = (mode: TimerMode) => {
  if (mode === "focus") return "#4A1F2E";
  if (mode === "shortBreak") return "#1B4D2C";
  return "#1E3A5F";
};

export const getAccentColor = (mode: TimerMode) => {
  if (mode === "focus") return "#FF8FA3";
  if (mode === "shortBreak") return "#81C784";
  return "#64B5F6";
};
