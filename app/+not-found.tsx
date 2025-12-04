import { View, Text, StyleSheet } from "react-native";
import {Link, Stack} from "expo-router";
import {useTheme} from "@/context/ThemeContext";

export default function NotFound() {
    const {color} = useTheme()
    const styles = createStyles(color)
    return(
        <>
            <Stack.Screen options={{ title: 'Page Introuvable' }}/>
            <View style={styles.container}>
                <Text style={styles.title}>Cette page n&apo;existe pas.</Text>
                <Link href={'/'} style={styles.link}>
                    <Text style={styles.linkText}>Retourner à l&apo;accueil</Text>
                </Link>
            </View>
        </>
    )
}

const createStyles = (color: Record<string, string>) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: color.background
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold' as const,
        color: color.text,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: color.primary,
    }
})