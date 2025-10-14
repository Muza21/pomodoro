import React from "react";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

type IoniconProps = Omit<React.ComponentProps<typeof Ionicons>, "name">;
type MaterialIconProps = Omit<
  React.ComponentProps<typeof MaterialIcons>,
  "name"
>;

export const PlayIcon = (props: IoniconProps) => (
  <Ionicons {...props} name="play" />
);
export const PauseIcon = (props: IoniconProps) => (
  <Ionicons {...props} name="pause" />
);
export const SkipIcon = (props: IoniconProps) => (
  <Ionicons {...props} name="play-skip-forward" />
);
export const ResetIcon = (props: MaterialIconProps) => (
  <MaterialIcons {...props} name="refresh" />
);
export const SettingsIcon = (props: IoniconProps) => (
  <Ionicons {...props} name="settings" />
);
export const FocusIcon = (props: IoniconProps) => (
  <MaterialCommunityIcons {...props} name="brain" />
);
export const ShortBreakIcon = (props: IoniconProps) => (
  <Ionicons {...props} name="cafe" />
);
export const LongBreakIcon = (props: IoniconProps) => (
  <MaterialCommunityIcons {...props} name="timer-sand-full" />
);
export const SaveIcon = (props: IoniconProps) => (
  <Ionicons {...props} name="checkmark" />
);
export const BackIcon = (props: IoniconProps) => (
  <Ionicons {...props} name="arrow-back" />
);
export const SessionsIcon = (props: IoniconProps) => (
  <Ionicons {...props} name="list" />
);
export const PlusIcon = (props: IoniconProps) => (
  <Entypo {...props} name="plus" />
);
export const MinusIcon = (props: IoniconProps) => (
  <Entypo {...props} name="minus" />
);
