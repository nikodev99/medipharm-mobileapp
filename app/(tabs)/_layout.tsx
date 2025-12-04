import { Tabs } from "expo-router";
import {Clock, Search, Settings, User} from "lucide-react-native"

import {StyleSheet, View} from "react-native";
import AdBanner from "@/components/AdBanner";
import {useTheme} from "@/context/ThemeContext";

export default function TabLayout() {
    const {color} = useTheme()
    
    return(
        <View style={styles.container}>
            <Tabs screenOptions={{
                tabBarActiveTintColor: color.primary,
                tabBarInactiveTintColor: color.tabIconDefault,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: color.surface,
                    borderTopColor: color.border,
                    borderTopWidth: 1
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600' as const
                }
            }}>
                <Tabs.Screen name="index" options={{
                    title: 'Recherche',
                    tabBarIcon: ({color, size}) => <Search size={size} color={color} />
                }} />
                <Tabs.Screen name="history" options={{
                    title: 'Historique',
                    tabBarIcon: ({color, size}) => <Clock size={size} color={color} />
                }} />
                <Tabs.Screen name="profil" options={{
                    title: 'Profile',
                    tabBarIcon: ({color, size}) => <User size={size} color={color} />
                }} />
                <Tabs.Screen name="settings" options={{
                    title: 'Paramètres',
                    tabBarIcon: ({color, size}) => <Settings size={size} color={color} />
                }} />
            </Tabs>
            <AdBanner />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})