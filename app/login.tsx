import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { HStack } from "@/components/HStack";
import { Input } from "@/components/Input";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { useAuth } from "@/context/AuthContext";
import { globals } from "@/styles/_globals";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

export default function Login() {
  const { authenticate, isLoadingAuth } = useAuth();

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState<boolean>(true); // true => hide

  function onTogglePassword() {
    setTogglePassword(!togglePassword);
  }

  function onToggleAuthMode() {
    setAuthMode(authMode === "login" ? "register" : "login");
  }

  async function onAuthenticate() {
    await authenticate(authMode, email, password);
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={globals.container}>
      <ScrollView contentContainerStyle={globals.container}>
        <VStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          p={40}
          gap={40}
        >
          <HStack gap={10}>
            <Text fontSize={30} bold mb={20}>
              Ticket Booking
            </Text>
            <TabBarIcon name="ticket" size={50} />
          </HStack>

          <VStack w={"100%"} gap={30}>
            <VStack gap={5}>
              <Text ml={10} fontSize={14} color="gray">
                Email
              </Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={false}
                h={48}
                p={14}
              />
            </VStack>

            <VStack gap={5}>
              <Text ml={10} fontSize={14} color="gray">
                Password
              </Text>
              <Input
                value={password}
                onChangeText={setPassword}
                secureTextEntry={togglePassword}
                placeholder="Password"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={false}
                h={48}
                p={14}
              />
              <Text
                ml={10}
                fontSize={14}
                color="blue"
                underline
                onPress={onTogglePassword}
              >
                {togglePassword ? "Show password" : "Hide password"}
              </Text>
            </VStack>

            <Button isLoading={isLoadingAuth} onPress={onAuthenticate}>
              {authMode.toUpperCase()}
            </Button>
          </VStack>

          <Divider w={"90%"} />

          <Text onPress={onToggleAuthMode} fontSize={16} underline>
            {authMode === "login" ? "Register new account" : "Login to account"}
          </Text>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
