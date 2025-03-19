import { defaultShortcuts, ShortcutProps } from "@/styles/shortcuts";
import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

export interface StackProps
  extends PropsWithChildren,
    ShortcutProps,
  ViewProps {
  backgroundColor?: string;
  flex?: number;
 borderRadius?: number;
  direction?: "row" | "column";
  gap?: number;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export function Stack({
  flex,
  direction,
  gap,
  alignItems,
  justifyContent,
  backgroundColor,
  borderRadius,
  children,
  style,
  // backgroundColor,
  ...restProps


}: StackProps) {
  return (
    <View
      style={[
        defaultShortcuts(restProps),
        {
          flex,
          flexDirection: direction,
          gap,
          alignItems,
          justifyContent,
          backgroundColor,  
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
}
