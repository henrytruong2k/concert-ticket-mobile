import React from "react";
import { Image, ImageProps, StyleSheet } from "react-native";
import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";

interface custonImagePropos extends ShortcutProps {
  source: any;
  style?: ImageProps;
}
