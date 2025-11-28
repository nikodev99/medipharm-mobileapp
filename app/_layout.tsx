import { SplashScreen, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecentSearchesContext } from "@/context/RecentSearchesContext";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle:  'Retour'}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pharmacy-results" options={{ presentation: 'card' }} />
      <Stack.Screen name="pharmacy-details" options={{ presentation: 'card' }} />
    </Stack>
  )
}

export default function RootLayout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);
  return(
    <QueryClientProvider client={queryClient}>
      <RecentSearchesContext>
        <GestureHandlerRootView>
          <StatusBar style="light" />
          <RootLayoutNav />
        </GestureHandlerRootView>
      </RecentSearchesContext>
    </QueryClientProvider>
  )
}
