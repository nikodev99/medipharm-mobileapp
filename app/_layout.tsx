import { SplashScreen, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecentSearchesContext } from "@/context/RecentSearchesContext";
import {useEffect} from "react";
import {ThemeContext, useTheme} from "@/context/ThemeContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()

function RootLayoutNav() {
    const { activeColorScheme } = useTheme()
  return (
      <>
          <StatusBar style={activeColorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack screenOptions={{ headerBackTitle:  'Retour' }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name='login' options={{ headerShown: false }} />
              <Stack.Screen name="pharmacy-results" options={{ presentation: 'card' }} />
              <Stack.Screen name="pharmacy-details" options={{ presentation: 'card' }} />
          </Stack>
      </>
  )
}

export default function RootLayout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);
  return(
    <QueryClientProvider client={queryClient}>
        <ThemeContext>
          <RecentSearchesContext>
            <GestureHandlerRootView>
              <StatusBar style="light" />
              <RootLayoutNav />
            </GestureHandlerRootView>
          </RecentSearchesContext>
        </ThemeContext>
    </QueryClientProvider>
  )
}
