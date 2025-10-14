export type TimerMode = "focus" | "shortBreak" | "longBreak";

export type Settings = {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
};
