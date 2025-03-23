import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, Tabs } from "expo-router";
import React, { ComponentProps } from "react";
import { Text } from "react-native";

export default function TabLayout() {
  const { user } = useAuth();

  const tabs = [
    {
      showFor: [],
      name: "home",
      displayName: "Home",
      icon: "home",
      options: {
        headerShown: true,
      },
    },
    {
      showFor: [],
      name: "(events)",
      displayName: "Events",
      icon: "calendar",
      options: {
        headerShown: false,
      },
    },
    {
      showFor: [UserRole.Attendee],
      name: "(tickets)",
      displayName: "My Tickets",
      icon: "ticket",
      options: {
        headerShown: false,
      },
    },
    {
      showFor: [UserRole.Manager],
      name: "(scan-ticket)",
      displayName: "Scan Ticket",
      icon: "scan",
      options: {
        headerShown: true,
      },
    },
    {
      showFor: [],
      name: "settings",
      displayName: "Settings",
      icon: "cog",
      options: {
        headerShown: true,
      },
    },
  ];

  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            ...tab.options,
            headerTitle: tab.displayName,
            href:
              tab.showFor.includes(user?.role!) || tab.showFor.length === 0
                ? (tab.name as Href)
                : null,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "black" : "gray", fontSize: 12 }}>
                {tab.displayName}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={tab.icon as ComponentProps<typeof Ionicons>["name"]}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
