import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  // Check from context if user is logged in
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
