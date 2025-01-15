import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { router, useFocusEffect, useNavigation } from "expo-router";

import { eventService } from "@/services/event";
import { Event } from "@/types/event";
import { UserRole } from "@/types/user";
import { useAuth } from "@/context/AuthContext";

import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { Divider } from "@/components/Divider";
import { Button } from "@/components/Button";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function EventsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  function onGoToEventPage(id: number) {
    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}`);
    }
  }

  async function buyTicket(id: number) {
    try {
      //await ticketService.createOne(id);
      Alert.alert("Success", "Ticket comprado exitosamente");
      fetchEvents();
    } catch (error) {
      Alert.alert("Error", "Error comprando ticket");
    }
  }

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
    } catch (error) {
      Alert.alert("Error", "Error al cargar los eventos");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Eventos",
      headerRight: user?.role === UserRole.Manager ? headerRight : null,
    });
  }, [navigation, user]);

  return (
    <VStack flex={1} p={20} pb={0} gap={20}>
      <HStack alignItems="center" justifyContent="center">
        <Text fontSize={18} bold>
          {events.length} Eventos
        </Text>
      </HStack>

      <FlatList
        data={events}
        keyExtractor={({ id }) => id.toString()}
        onRefresh={fetchEvents}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <VStack h={20} />}
        renderItem={({ item: event }) => (
          <VStack
            gap={20}
            p={20}
            style={{
              backgroundColor: "white",
              borderRadius: 20,
            }}
            key={event.id}
          >
            <TouchableOpacity onPress={() => onGoToEventPage(event.id)}>
              <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center">
                  <Text fontSize={26} bold>
                    {event.name}
                  </Text>
                  <Text fontSize={26} bold>
                    {" "}
                    |{" "}
                  </Text>
                  <Text fontSize={16} bold>
                    {event.location}
                  </Text>
                </HStack>
                {user?.role === UserRole.Manager && (
                  <TabBarIcon size={24} name="chevron-forward" />
                )}
              </HStack>
            </TouchableOpacity>

            <Divider />

            <HStack justifyContent="space-between">
              <Text bold fontSize={16} color="gray">
                Ventas: {event.totalTicketsPurchased}
              </Text>
              <Text bold fontSize={16} color="green">
                Confirmadas: {event.totalTicketsEntered}
              </Text>
            </HStack>

            {user?.role === UserRole.Attendee && (
              <VStack>
                <Button
                  variant="outlined"
                  disabled={isLoading}
                  onPress={() => buyTicket(event.id)}
                >
                  Comprar ticket
                </Button>
              </VStack>
            )}

            <Text fontSize={13} color="gray">
              {event.date}
            </Text>
          </VStack>
        )}
      />
    </VStack>
  );
}

const headerRight = () => {
  return (
    <TabBarIcon
      size={32}
      name="add-circle-outline"
      onPress={() => router.push("/(events)/new")}
    />
  );
};
