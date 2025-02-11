import { Button } from "@/components/Button";
import { VStack } from "@/components/VStack";
import { useAuth } from "@/context/AuthContext";
import React from "react";

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <VStack flex={1} m={20}>
      <Button onPress={logout}>Logout</Button>
    </VStack>
  );
}
