import { Tabs } from "expo-router";
import { Clock, Search } from "lucide-react-native"

import colors from "@/constants/colors";

export default function TabLayout() {
    return(
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.ligth.primary,
            tabBarInactiveTintColor: colors.ligth.tabIconDefault,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.ligth.surface,
                borderTopColor: colors.ligth.border,
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
        </Tabs>
    )
}