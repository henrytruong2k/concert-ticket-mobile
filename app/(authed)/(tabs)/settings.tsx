import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { useAuth } from "@/context/AuthContext";
import React from "react";

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  return (
    <VStack flex={1} m={20}>
      <Text>Email: {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
      <Button onPress={logout}>Logout</Button>
    </VStack>
  );
}
