import { Text as RNText, TextProps } from "react-native";
import React, { PropsWithChildren } from "react";
import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";

export interface CustomTextProps
  extends PropsWithChildren,
    ShortcutProps,
    TextProps {
  fontSize?: number;
  bold?: boolean;
  underline?: boolean;
  color?: string;
}

export const Text = ({
  fontSize = 18,
  bold,
  underline,
  color,
  children,
  numberOfLines = 1, // Mặc định giới hạn 1 dòng
  ellipsizeMode = "tail", // Cắt chữ ở cuối bằng dấu "..."
  ...restProps
}: CustomTextProps) => {
  return (
    <RNText
      style={[
        defaultShortcuts(restProps),
        {
          fontSize,
          fontWeight: bold ? "bold" : "normal",
          textDecorationLine: underline ? "underline" : "none",
          color,
        },
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...restProps}
    >
      {children}
    </RNText>
  );
};
