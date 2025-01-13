import { ComponentProps } from "react";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const tabs = [
    {
      showFor: [],
      name: "(events)",
      displayName: "Eventos",
      icon: "calendar",
      options: {
        headerShown: false,
      },
    },
    {
      showFor: [],
      name: "(tickets)",
      displayName: "Mis tickets",
      icon: "ticket",
      options: {
        headerShown: false,
      },
    },
    {
      showFor: [],
      name: "scan-ticket",
      displayName: "Escanear ticket",
      icon: "scan",
      options: {
        headerShown: true,
      },
    },
    {
      showFor: [],
      name: "settings",
      displayName: "Ajustes",
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
            //href: tab.showFor.includes()
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
