import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/context/AuthContext";

export default function AppLayout() {
  // Check from context if user is logged in
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
