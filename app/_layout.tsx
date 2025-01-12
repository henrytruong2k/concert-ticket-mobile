import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import React from "react";

export default function Root() {
  return (
    <>
      <StatusBar style="dark" />
      {/* Authentication provider */}
      <Slot />
      {/* Authentication provider */}
    </>
  );
}
