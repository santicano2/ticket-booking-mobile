import { Stack } from "expo-router";

export default function EventsLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Eventos" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="new" />
      <Stack.Screen name="event/[id]" />
    </Stack>
  );
}
