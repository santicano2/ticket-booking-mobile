import { useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

import { useAuth } from "@/context/AuthContext";

import { HStack } from "@/components/HStack";
import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function Login() {
  const { authenticate, isLoadingAuth } = useAuth();

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onAuthenticate() {
    await authenticate(authMode, email, password);
  }

  function onToggleAuthMode() {
    setAuthMode(authMode === "login" ? "register" : "login");
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <VStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          p={40}
          gap={40}
        >
          <HStack gap={10}>
            <Text fontSize={40} bold mb={20}>
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
                h={48}
                p={14}
              />
            </VStack>

            <VStack gap={5}>
              <Text ml={10} fontSize={14} color="gray">
                Contraseña
              </Text>
              <Input
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Contraseña"
                placeholderTextColor="darkgray"
                h={48}
                p={14}
              />
            </VStack>

            <Button isLoading={isLoadingAuth} onPress={onAuthenticate}>
              {authMode === "login" ? "Iniciar sesión" : "Registrarse"}
            </Button>
          </VStack>

          <Divider w={"90%"} />

          <Text onPress={onToggleAuthMode} fontSize={16} underline>
            {authMode === "login" ? "Registrarse" : "Iniciar sesión"}
          </Text>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
