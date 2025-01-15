import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { router, useNavigation } from "expo-router";

import { eventService } from "@/services/event";

import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function NewEvent() {
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());

  async function onSubmit() {
    try {
      setIsSubmitting(true);

      await eventService.createOne(name, location, date.toISOString());
      router.back();
    } catch (error) {
      Alert.alert("Error", "Error al crear el evento");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Nuevo evento" });
  }, []);

  return (
    <VStack m={20} flex={1} gap={30}>
      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Nombre
        </Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Ubicación
        </Text>
        <Input
          value={location}
          onChangeText={setLocation}
          placeholder="Ubicación"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Fecha
        </Text>
        {/* DateTimePicker */}
      </VStack>

      <Button
        mt={"auto"}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={onSubmit}
      >
        Crear
      </Button>
    </VStack>
  );
}
